import { UserPreferredChannel } from '@/enums/user-preferred-channel.enum';

export class TransferMetadata {
  static buildTransferRequested(
    userPreferredChannel: UserPreferredChannel,
  ): Record<string, string> {
    switch (userPreferredChannel) {
      case UserPreferredChannel.EMAIL:
      case UserPreferredChannel.IN_APP:
        return {
          title: 'A transfer from your account has been requested',
          content:
            'We have received your transfer request and it is being processed.',
        };
      default:
        throw new Error(
          `Unsupported user preferred channel: ${userPreferredChannel}`,
        );
    }
  }

  static buildTransferCompleted(
    userPreferredChannel: UserPreferredChannel,
  ): Record<string, string> {
    switch (userPreferredChannel) {
      case UserPreferredChannel.EMAIL:
      case UserPreferredChannel.IN_APP:
        return {
          title: 'A transfer from your account has been completed',
          content:
            'We have completed your transfer request and the funds are now available.',
        };
      default:
        throw new Error(
          `Unsupported user preferred channel: ${userPreferredChannel}`,
        );
    }
  }

  static buildTransferFailed(
    userPreferredChannel: UserPreferredChannel,
  ): Record<string, string> {
    switch (userPreferredChannel) {
      case UserPreferredChannel.EMAIL:
      case UserPreferredChannel.IN_APP:
        return {
          title: 'A transfer from your account has been failed',
          content:
            'We have failed your transfer request and the funds are still unavailable.',
        };
      default:
        throw new Error(
          `Unsupported user preferred channel: ${userPreferredChannel}`,
        );
    }
  }
}
