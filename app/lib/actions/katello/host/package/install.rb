module Actions
  module Katello
    module Host
      module Package
        class Install < Actions::Katello::AgentAction
          def self.agent_message
            :install_package
          end

          def agent_action_type
            :content_install
          end

          def humanized_name
            if input.try(:[], :hostname)
              _("Install package for %s") % input[:hostname]
            else
              _("Install package")
            end
          end

          def humanized_input
            [input[:content].join(", ")] + super
          end

          def finalize
            host = ::Host.find_by(:id => input[:host_id])
            host.update(audit_comment: (_("Installation of package(s) requested: %{packages}") % {packages: input[:content].join(", ")}).truncate(255))
          end
        end
      end
    end
  end
end
