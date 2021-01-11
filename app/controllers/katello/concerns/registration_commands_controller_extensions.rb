module Katello
  module Concerns
    module RegistrationCommandsControllerExtensions
      extend ActiveSupport::Concern

      def plugin_data
        aks = ActivationKey.authorized(:view_activation_keys)
                           .where(organization_id: registration_params[:organization_id])
                           .order(:name)
                           .map { |ak| { name: ak.name, lce: ak.environment&.name } }

        lces = KTEnvironment.readable
                            .where(organization_id: registration_params[:organization_id])
                            .order(:name)

        data = { activationKeys: aks, lifeCycleEnvironments: lces }

        if registration_params[:hostgroup_id].present?
          host_group = ::Hostgroup.authorized(:view_hostgroups).find(registration_params[:hostgroup_id])

          data.merge!({hostGroupActivationKeys: host_group.params['kt_activation_keys'],
            hostGroupEnvironment: host_group.lifecycle_environment&.name
            })
        end

        super.merge(data)
      end
    end
  end
end
