import { RepairManagementModule } from './repair-management.module';

describe('RepairManagementModule', () => {
  let repairManagementModule: RepairManagementModule;

  beforeEach(() => {
    repairManagementModule = new RepairManagementModule();
  });

  it('should create an instance', () => {
    expect(repairManagementModule).toBeTruthy();
  });
});
