import { browser, by, element, $ } from 'protractor';
import { CommonPage } from '../../common.po';

describe('Display repair management Overview page', () => {
  let originalTimeout = 0;
  const commonPage = new CommonPage();
  const EC = browser.ExpectedConditions;

  beforeEach(() => {
    commonPage.navigateTo('/repair-management/overview');
    browser.waitForAngularEnabled(false);
    browser.wait(EC.visibilityOf($('#btn-overview')));
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;
  });

  it('should display overview page', () => {
    browser.sleep(3000);
    expect(browser.getCurrentUrl()).toContain('/repair-management/overview');
  });

  it('Should Create Repair with Removal and Repair Information', function() {

    browser.sleep(1000);
    const createRepair = commonPage.getSelectedIdSelector('btn-overview');
    createRepair.click();
    browser.sleep(3000);
    const ip = ('A0123126rdedetr' + Math.floor((Math.random() * 10) + 1) + Math.floor((Math.random() * 10) + 1)).toString();
    commonPage.getSelectedIdSelector('inp-repair-lruserialNumber').sendKeys(ip);
    commonPage.getSelectedIdSelector('btn-removal-go').click();
    browser.sleep(5000);

    const createRemovals = commonPage.getSelectedIdSelector('btn-removal-createremoval');
    createRemovals.click();
    browser.sleep(10000);


    const slectedDate = commonPage.getSelectedIdSelector('inp-createremoval-pickermodal');
    slectedDate.sendKeys('2019-03-09');
    commonPage.getSelectedIdSelector('sl-repair-removal-maintenanceStation').sendKeys('Abu Dhabi');
    commonPage.getSelectedIdSelector('sl-repair-removal-repairAiline').sendKeys('American Airline');
    commonPage.getSelectedIdSelector('sl-repair-removal-repairlruName').sendKeys('DSU-D0');
    browser.sleep(4000);
    commonPage.getSelectedIdSelector('sl-repair-removal-repairlruPartNumber').sendKeys('180771-100-101');
    browser.sleep(4000);
    commonPage.getSelectedIdSelector('sl-repair-removal-repairReasonOfRemoval').sendKeys('DSU INOP');
    const serialNumber = commonPage.getSelectedIdSelector('inp-createremoval-lurserial-name');
    serialNumber.sendKeys(('A0123126rdedetr' + Math.floor((Math.random() * 10) + 1) + Math.floor((Math.random() * 10) + 1)).toString());
    commonPage.getSelectedIdSelector('sl-repair-removal-repairRevisionApi').sendKeys('A');
    commonPage.getSelectedIdSelector('sl-repair-removal-repairRevisionNumber').sendKeys('1');
    browser.sleep(3000);

    const reasonOfRemoval =  commonPage.getSelectedIdSelector('sl-repair-removal-repairReasonOfRemoval');
    reasonOfRemoval.sendKeys('DSU');
    const getTail = commonPage.getSelectedIdSelector('sl-repair-removal-repairTail');
    getTail.sendKeys('N101NN');
    browser.sleep(1000);
    commonPage.getSelectedIdSelector('mod-dot-in-1').click();

    const saveRemoval = commonPage.getSelectedIdSelector('btn-Createremoval-createremoval-saveremoval');
    saveRemoval.click();
    browser.sleep(3000);


    const createRemoval = commonPage.getSelectedIdSelector('btn-repair-removal-next');
    createRemoval.click();
    browser.sleep(2000);

    commonPage.getSelectedIdSelector('sl-repair-removal-repairstation').click();
    commonPage.getSelectedIdSelector('sl-repair-removal-repairstation').sendKeys('Los Angeles');

    const repairlevel = commonPage.getSelectedIdSelector('chkbox-level-1-repair');
    repairlevel.click();
    const repairTechnician = commonPage.getSelectedIdSelector('inp-repair-removal-techician');
    repairTechnician.sendKeys('232');

    const workOrder = commonPage.getSelectedIdSelector('inp-overview-workorder');
    workOrder.sendKeys('232');
    browser.sleep(3000);

    const gonext = commonPage.getSelectedIdSelector('btn-repair-repairs-next');
    browser.actions().mouseMove(gonext).click().perform();
    browser.sleep(3000);
    const workOrder1 = commonPage.getSelectedIdSelector('inp-fault-repairDetailsRemark');
    workOrder1.sendKeys('test123');
    browser.sleep(3000);

    browser.sleep(2000);
    commonPage.getSelectedIdSelector('Go_Passed').click();
    commonPage.getSelectedIdSelector('inp-fault-repairDetailsRemark').sendKeys('test');
    commonPage.getSelectedIdSelector('btn-repair-repairDetailsRemark-next').click();
    browser.sleep(2000);

    commonPage.getSelectedIdSelector('btn-repair-repairs-moddotout-next').click();
    browser.sleep(3000);
    const saveRepair = commonPage.getSelectedIdSelector('btn-repair-repairs-save');
    saveRepair.click();
    browser.sleep(6000);
    expect(element(by.id('btn-repair-repairs-save')).isPresent()).toBeFalsy();
  });

});
