module Katello
  module Concerns
    module RegistrationCommandsControllerExtensions
      extend ActiveSupport::Concern

      # TODO: This should be done on frontend
      # def format_activation_key
      #   return if registration_params[:activation_key].blank?
      #   registration_params[:activation_key] = registration_params[:activation_key].split(',').map(&:strip).reject(&:blank?).join(',')
      # end

      def plugin_data
        super.merge({activationKeys: ActivationKey.all})
      end
    end
  end
end
