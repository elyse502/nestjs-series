import { AdminApiKeyGuard } from './admin-api-key.guard';

describe('AdminApiKeyGuard', () => {
  it('should be defined', () => {
    expect(new AdminApiKeyGuard()).toBeDefined();
  });
});
