import { Group, Stack, useMantineColorScheme } from '@mantine/core';
import { ChannelTypeEnum } from '@novu/shared';
import { ErrorIcon } from '../../../../design-system/icons';
import { colors, Text } from '../../../../design-system';
import { LimitBar } from '../LimitBar';
import { useIntegrationLimit } from '../../../../hooks';
import { IIntegratedProvider } from '../../IntegrationsStorePage';

export const NovuProviderSidebarContent = ({ provider }: { provider: IIntegratedProvider }) => {
  const {
    data: { limit, count },
    loading,
  } = useIntegrationLimit(provider?.channel || ChannelTypeEnum.EMAIL);
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';
  const descriptionColor = isDark ? colors.B60 : colors.B40;

  return (
    <Stack spacing={16}>
      <Group pt={10} pb={10} spacing={16}>
        <ErrorIcon width="26" height="26" viewBox="0 0 22 22" color={descriptionColor} />
        <Text color={descriptionColor}>
          Novu provider allows sending max {limit} {provider.channel === ChannelTypeEnum.EMAIL ? 'emails' : 'messages'}{' '}
          per month,
          <br />
          to send more messages, configure a different provider
        </Text>
      </Group>
      <LimitBar channel={provider.channel} limit={limit} count={count} loading={loading} showDescription={false} />
    </Stack>
  );
};
