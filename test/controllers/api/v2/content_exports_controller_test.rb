require "katello_test_helper"

module Katello
  class Api::V2::ContentExportsControllerTest < ActionController::TestCase
    include Support::ForemanTasks::Task

    def permissions
      @view_permission = :view_content_views
      @create_permission = :create_content_views
      @update_permission = :edit_content_views
      @destroy_permission = :destroy_content_views
      @export_permission = :export_content_views
      @export_library_permission = :export_library_content
    end

    def setup
      setup_controller_defaults_api
      @library_dev_staging_view = ContentView.find(katello_content_views(:library_dev_staging_view).id)
      @library_view_version = katello_content_view_versions(:library_dev_staging_view_version)
      permissions
    end

    def test_export_api_status_true_for_pulp3
      FactoryBot.create(:smart_proxy, :default_smart_proxy, :with_pulp3)
      get :api_status
      assert_response :success
      assert JSON.parse(@response.body)["api_usable"]
    end

    def test_export_api_status_false_for_pulp2
      FactoryBot.create(:smart_proxy, :default_smart_proxy)
      get :api_status
      assert_response :success
      refute JSON.parse(@response.body)["api_usable"]
    end

    def test_index_protected
      allowed_perms = [@export_permission]
      denied_perms = [@create_permission, @update_permission, @destroy_permission]

      assert_protected_action(:index, allowed_perms, denied_perms) do
        get :index, params: { :content_view_id => @library_dev_staging_view.id }
      end
    end

    def test_export_api_status_protected
      allowed_perms = [@export_permission, @view_permission]
      denied_perms = [@create_permission, @update_permission, @destroy_permission]

      assert_protected_action(:api_status, allowed_perms, denied_perms) do
        get :api_status
      end
    end

    def test_export_with_pulp2repo_fail
      SmartProxy.stubs(:pulp_primary).returns(FactoryBot.create(:smart_proxy, :default_smart_proxy))

      version = @library_dev_staging_view.versions.first
      post :version, params: { :id => version.id, :iso_mb_size => 5, :export_to_iso => "foo"}
      response = JSON.parse(@response.body)['displayMessage']
      assert_equal response, 'Invalid usage for Pulp 2 repositories. Use export for Yum repositories'
      assert_response :bad_request
    end

    def test_version_protected
      @controller.stubs(:fail_if_not_pulp3)
      allowed_perms = [@export_permission]
      denied_perms = [@create_permission, @update_permission,
                      @destroy_permission, @view_permission]
      version = @library_dev_staging_view.versions.first

      assert_protected_action(:version, allowed_perms, denied_perms) do
        post :version, params: { :id => version.id }
      end
    end

    def test_library_protected
      @controller.stubs(:fail_if_not_pulp3)
      allowed_perms = [{name: @export_library_permission, :resource_type => "Organization"}]
      denied_perms = [@create_permission, @update_permission,
                      @destroy_permission, @view_permission, @export_permission]

      org = get_organization
      assert_protected_action(:library, allowed_perms, denied_perms, [org]) do
        post :library, params: { organization_id: org.id}
      end
    end

    def test_version
      @controller.stubs(:fail_if_not_pulp3)
      chunk_size_mb = 100
      destination = "example.com"
      export_task = @controller.expects(:async_task).with do |action_class, options|
        assert_equal ::Actions::Pulp3::Orchestration::ContentViewVersion::Export, action_class
        assert_equal options[:content_view_version].id, @library_view_version.id
        assert_equal options[:destination_server], destination
        assert_equal options[:chunk_size], chunk_size_mb
        assert_nil options[:from_history]
        assert options[:fail_on_missing_content]
      end
      export_task.returns(build_task_stub)
      post :version, params: { id: @library_view_version.id,
                               destination_server: destination,
                               chunk_size_mb: chunk_size_mb,
                               fail_on_missing_content: true
                             }
      assert_response :success
    end

    def test_library
      @controller.stubs(:fail_if_not_pulp3)
      org = get_organization
      chunk_size_mb = 100
      destination = "example.com"
      export_task = @controller.expects(:async_task).with do |action_class, organization, options|
        assert_equal ::Actions::Pulp3::Orchestration::ContentViewVersion::ExportLibrary, action_class
        assert_equal organization.id, org.id
        assert_equal options[:destination_server], destination
        assert_equal options[:chunk_size], chunk_size_mb
        refute options[:fail_on_missing_content]
        assert_nil options[:from_history]
      end
      export_task.returns(build_task_stub)
      post :library, params: { organization_id: org.id,
                               destination_server: destination,
                               chunk_size_mb: chunk_size_mb
                             }
      assert_response :success
    end
  end
end
