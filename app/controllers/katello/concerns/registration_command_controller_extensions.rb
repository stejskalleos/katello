module Katello
  module Concerns
    module RegistrationCommandControllerExtensions
      extend ActiveSupport::Concern

      def registration_args
        args = super

        return args if registration_params['activation_key'].empty?
        args['activation_key'] = args['activation_key'].map { |ack| ack['value']}.join(',')
        args
      end

      def form_data
        data = super
        acks = ActivationKey.readable.where(organization_id: registration_params['organization_id'])
        acks = acks.to_a.map.with_index { |ack, i| { label: "#{ack.name} (#{ack.environment.name})", value: ack.name, index: i }}

        data.merge(data.merge(activationKeys: acks))
      end
    end
  end
end
