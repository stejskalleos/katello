module Katello
  module Concerns
    module RegistrationCommandsControllerExtensions
      extend ActiveSupport::Concern

      def plugin_data
        super.merge({activationKeys: ActivationKey.select(:name)})
      end
    end
  end
end
