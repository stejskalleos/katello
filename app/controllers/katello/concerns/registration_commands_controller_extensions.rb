module Katello
  module Concerns
    module RegistrationCommandsControllerExtensions
      extend ActiveSupport::Concern

      def plugin_data
        aks = ActivationKey.authorized(:view_activation_keys)
                           .where(organization_id: registration_params[:organization_id])
                           .map { |ak| { name: ak.name, lce: ak.environment&.name } }
        data = { activationKeys: aks }

        if registration_params[:hostgroup_id]
          host_group = ::Hostgroup.authorized(:view_hostgroups).find(registration_params[:hostgroup_id])
          data.merge!({hostGroupActivationKeys: host_group.params['kt_activation_keys']})
        end

        super.merge(data)
      end
    end
  end
end
