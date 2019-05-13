import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import * as moment from 'moment-timezone';
import { SelectionModel } from '@angular/cdk/collections';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { RepairRepairsStations } from '../../../shared/services/repair/repairs/repairs';
import { RepairsService } from '../../../shared/services/repair/repairs/repairs.service';
import { PickerModel } from './pickerModel';
import { DateFormatterService } from '../../../shared/services/dateFormatter/dateformatter.service';
import { NgForm } from '@angular/forms';
import { UserService } from '../../../shared/services/user/user.service';
import { PrintService } from '../../../shared/services/print/print.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})

export class OverviewComponent implements OnInit {
  createRemovalObjects = {
    loadLruPartNo: true,
    loadReasonOfRemoval: true
  };
  closeAllWindow = [];
  removalError: any;
  repairTypeLevel: any;
  selectedOption: string;
  isTail = true;
  LruNumberData: any = [];
  selectedModDotOutData = [];
  Mod: any;
  isDisabledTails = false;
  pickerModel: any = PickerModel;
  list: any = [];
  removalList: any = [];
  repairData: any = [];
  maintenancedata: any = [];
  airData: any = [];
  tailsData = [];
  ReasonData: any = [];
  serialNumber: any;
  lurNameData: any = [];
  enableSearchToolBar = false;
  enablesearchModal = false;
  displayedColumns: string[] = ['urlPartNumber', 'serialNumber', 'repairDate', 'repairStation', 'airline', 'tail'];
  dataSource: any = [];
  selection: any = new SelectionModel<RepairRepairsStations>(false, []);
  updatedTime: any;
  modalRef: any;
  isLoading = true;
  datepickFromDate: any = moment().subtract(15, 'days');
  datepickToDate: any = new Date();
  toDate: string;
  modFilter: number;
  modIn1: Array<any> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  modInData = [];
  modMouseDownFilter: number;
  modDot1: Array<any> = [17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32];
  modOutData = [];
  fromDate: string;
  revisionObject = {};
  modInActiveFilterMouseDown: any;
  modActiveFilterMouseDown: any;
  empMod: any = [];
  patternError = false;
  repairLevel: string;
  repairTypes: any[] = [
    {
      label: 'No Fault Found (NFF)',
      key: '',
      value: 1,
      id: 'chkbox-no-fault'
    },
    {
      label: 'Level 1 Repair',
      key: 'Go / No Go',
      value: 2,
      id: 'chkbox-level-1-repair'
    },
    {
      label: 'Level 2 Repair',
      key: 'SRU Swap',
      value: 3,
      id: 'chkbox-level-2-repair'
    }
  ];
  repairDetailsType: any[] = [
    {
      label: 'Go / Passed',
      value: 1,
      id: 'Go_Passed'
    },
    {
      label: 'No Go / Failed',
      value: 0,
      id: 'NoGo_Failed'
    }
  ];
  revision: Array<any> = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K',
    'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];


  rev: Array<number> = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  actionToolBarConfig = {
    createLabel: 'Create Repair',
    moduleName: 'Create Repair',
    id: 'btn-overview',
    filterIds: {
      filterListId: 'filter-overview-list',
      filterText: 'inp-filter-overview-text'
    },
    enableSearch: false,
    enableCreate: true,
    buttonList: []
  };
  removalObj: any = {
    serailNoPattern: false,
    formObj: null,
    errorMsg: null,
    formSubmitted: false,
    loadVisible: false,
    modalRef: null,
    isFormSubmitted: false,
    isError: false,
    isDeleted: false,
    enableDelete: false
  };
  reviewObj = {
    formObj: null,
    errorMsg: null,
    formSubmitted: false,
    modalRef: null,
    loadVisible: false,
    isFormSubmitted: false,
    isError: false,
    isDeleted: false,
    enableDelete: false
  };
  faultObj = {
    formObj: null,
    errorMsg: null,
    formSubmitted: false,
    modalRef: null,
    loadVisible: false,
    isFormSubmitted: false,
    isError: false,
    isDeleted: false,
    enableDelete: false
  };
  repairDetailObj = {
    formObj: null,
    errorMsg: null,
    formSubmitted: false,
    modalRef: null,
    loadVisible: false,
    isFormSubmitted: false,
    isError: false,
    isDeleted: false,
    enableDelete: false
  };
  modObj = {
    formObj: null,
    errorMsg: null,
    formSubmitted: false,
    modalRef: null,
    isFormSubmitted: false,
    isError: false,
    isDeleted: false,
    enableDelete: false
  };
  repairObj = {
    formObj: null,
    errorMsg: null,
    formSubmitted: false,
    modalRef: null,
    loadVisible: false,
    isFormSubmitted: false,
    isError: false,
    isDeleted: false,
    enableDelete: false
  };
  createRemovalObj: any = {
    formObj: null,
    errorMsg: null,
    formSubmitted: false,
    modalRef: null,
    isFormSubmitted: false,
    isError: false,
    loadVisible: false,
    selectedRow: [],
    isDeleted: false,
    enableDelete: false,
    getSerialNumberVal: null
  };
  searchFailed = false;
  searchRepairError = false;
  modData: any = [];
  getRemovalData = [];
  repairRevisionApi: any = [];
  allModelData = {};
  selectedRepairStation = '';
  reasonOfRemoval = '';
  summaryRevision = '';
  userEmail = '';
  enablePrint = false;
  @ViewChild('level2Repair') private level2Repair: TemplateRef<any>;
  @ViewChild('createRemovalForm') createRemovalForms: NgForm;
  @ViewChild('createRemovalModal') private createRemovalModal: TemplateRef<any>;
  @ViewChild('removalModal') private removalModal: TemplateRef<any>;
  @ViewChild('faultModal') private faultModal: TemplateRef<any>;
  @ViewChild('reviewModal') private reviewModal: TemplateRef<any>;
  @ViewChild('repairDetailsModal') private repairDetailsModal: TemplateRef<any>;

  @ViewChild('modModal') private modModal: TemplateRef<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('repairModal') private repairModal: TemplateRef<any>;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private formBuilder: FormBuilder, private repiarsService: RepairsService,
    public toaster: ToastrService, private dateService: DateFormatterService, config: NgbModalConfig, public modalService: NgbModal,
    private userService: UserService, private printService: PrintService
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }
  enableSerialInfo = false;
  levelTwoRepair: any;
  levelTwoPatternValidation = {
    on: [false, false, false, false, false],
    off: [false, false, false, false, false],
    comm: false
  };
  commonObj = {
    getCreateRepairInfo: []
  };
  ngOnInit() {
    this.getRepairAction();
    this.getRepairList();
    this.searchFailed = undefined;
    this.getFilterDate(this.datepickFromDate, this.datepickToDate);
    if (!this.dataSource.data) {
      this.dataSource.data = [];
    }
    const repairtodayDate = new Date();
    const repaircurrentDates = {
      year: null,
      month: null,
      day: null
    };
    repaircurrentDates.year = repairtodayDate.getUTCFullYear();
    repaircurrentDates.month = repairtodayDate.getUTCMonth() + 1;
    repaircurrentDates.day = repairtodayDate.getUTCDate();
    this.repairObj.formObj = this.formBuilder.group({
      pickerModel: [repaircurrentDates, [Validators.required]],
      techician: ['', [Validators.required, Validators.maxLength(45)]],
      workOrder: ['', [Validators.required, Validators.maxLength(45), Validators.pattern('^[a-zA-Z0-9\\.\\_\\- ]+$')]],
      repairStation: ['', [Validators.required]],
      repairType: ['', [Validators.required]]

    });
    this.faultObj.formObj = this.formBuilder.group({
      remarks: ['', [Validators.required, Validators.maxLength(255), Validators.pattern('^[a-zA-Z0-9\\.\\_\\- ]+$')]],
    });
    this.repairDetailObj.formObj = this.formBuilder.group({
      repairDetailsRemark: ['', [Validators.maxLength(255), Validators.pattern('^[a-zA-Z0-9\\.\\_\\- ]+$')]],
      repairDetailsType: ['', [Validators.required]]

    });
    this.reviewObj.formObj = this.formBuilder.group({
      repairRevision: ['', [Validators.required]],
    });
    this.modObj.formObj = this.formBuilder.group({
      repairRevision: ['', [Validators.required]],
    });
    this.removalObj.formObj = this.formBuilder.group({
      serialNumber: ['', [Validators.required, Validators.maxLength(45), Validators.pattern('^[a-zA-Z0-9\\.\\_\\- ]+$')]],
      repairRevision: ['', [Validators.required]],
      repairRevisionApi: ['', []],
      Revision: ['', []],
      lruSerialNumber: ['', []],
      repairRevisionNumber: ['', []]


    });

    const today = new Date();
    const currentDate = {
      year: null,
      month: null,
      day: null
    };
    currentDate.year = today.getUTCFullYear();
    currentDate.month = today.getUTCMonth() + 1;
    currentDate.day = today.getUTCDate();
    this.createRemovalObj.formObj = this.formBuilder.group({
      pickerModel: [currentDate, [Validators.required]],
      maintenanceSation: ['', [Validators.required]],
      repairAiline: ['', [Validators.required]],
      repairTail: ['', [Validators.required]],
      repairlruName: ['', [Validators.required]],
      repairlruPartNumber: ['', [Validators.required]],
      repairReasonOfRemoval: ['', [Validators.required]],
      repairRevision: ['', [Validators.required]],
      repairRevisionApi: ['', [Validators.required]],
      lruSerialNumber: ['', [Validators.required, Validators.maxLength(60), Validators.pattern('^[a-zA-Z0-9\\.\\_\\- ]+$')]],
      repairRevisionNumber: ['', []]
    });
    this.createRemovalObj.formObj.get('repairTail').disable();

    /**Check Role Acces */
    this.userService.checkUserRole.subscribe((userInfo) => {
      if (userInfo && userInfo.email) {
        this.userEmail = userInfo.email;
      }
    });
  }
  getRepairList() {
    this.isLoading = true;
    this.dataSource.data = [];
    this.updatedTime = new Date();
    this.dataSource.paginator = this.paginator;
    this.dataSource = new MatTableDataSource<any>();
    this.dataSource.sort = this.sort;
    this.isLoading = false;
  }
  getEvent(params) {
    this.enablePrint = false;
    this.repairObj.enableDelete = false;
    if (params.moduleName === 'Create Repair') {
      this.repairList();
      this.resetFormData();
      this.resetForm();

      this.repairObj.formObj.reset();
      const currentDates = {
        year: null,
        month: null,
        day: null
      };
      currentDates.year = new Date().getUTCFullYear();
      currentDates.month = new Date().getUTCMonth() + 1;
      currentDates.day = new Date().getUTCDate();
      this.repairObj.formObj.controls.pickerModel.setValue(currentDates);
      this.repairObj.formObj.controls.repairStation.setValue('');

      this.removalObj.formObj.controls['serialNumber'].setValue('');
      this.removalObj.formObj.controls['repairRevision'].setValue('');
      if (params.eventName === 'create') {
        this.open(this.removalModal);
      }
    }
  }
  getRemovalModal(serialNo) {
    this.commonObj.getCreateRepairInfo = [];
    // To get dropdown list
    if (this.commonObj.getCreateRepairInfo.length !== 6) {
      this.getLruNameList();
      this.getMaintenanceStationsList();
      this.getAirline();
    }

    this.empMod = [];
    this.createRemovalObj.enableDelete = false;
    const today = new Date();
    const currentDate = {
      year: null,
      month: null,
      day: null
    };
    currentDate.year = today.getUTCFullYear();
    currentDate.month = today.getUTCMonth() + 1;
    currentDate.day = today.getUTCDate();

    this.createRemovalObj.formObj = this.formBuilder.group({
      pickerModel: ['', [Validators.required]],
      maintenanceSation: ['', [Validators.required]],
      repairAiline: ['', [Validators.required]],
      repairTail: ['', [Validators.required]],
      repairlruName: ['', [Validators.required]],
      repairlruPartNumber: ['', [Validators.required]],
      repairReasonOfRemoval: ['', [Validators.required]],
      repairRevision: ['', [Validators.required]],
      repairRevisionApi: [''],
      lruSerialNumber: [serialNo, [Validators.required, Validators.maxLength(60), Validators.pattern('^[a-zA-Z0-9\\.\\_\\- ]+$')]],
      repairRevisionNumber: ['', []]
    });
    this.createRemovalObj.formObj.controls['lruSerialNumber'].setValue(serialNo);
    this.createRemovalObj.formObj.get('repairTail').disable();
    this.open(this.createRemovalModal);
  }
  getRepairModal() {
    this.getRepairActionList();
    this.repairObj.enableDelete = false;
    this.repairObj.loadVisible = true;
    this.repairObj.formSubmitted = true;
    if (this.repairObj.formObj.invalid) {
      this.repairObj.formSubmitted = false;
      this.repairObj.loadVisible = false;
    }
    const todayDate = new Date();
    const currentDates = {
      year: null,
      month: null,
      day: null
    };
    currentDates.year = todayDate.getUTCFullYear();
    currentDates.month = todayDate.getUTCMonth() + 1;
    currentDates.day = todayDate.getUTCDate();
    this.repairObj.formObj = this.formBuilder.group({
      pickerModel: [currentDates, [Validators.required]],
      techician: ['', [Validators.required, Validators.maxLength(45), Validators.pattern('^[a-zA-Z0-9\\.\\_\\- ]+$')]],
      workOrder: ['', [Validators.required, Validators.maxLength(45), Validators.pattern('^[a-zA-Z0-9\\.\\_\\- ]+$')]],
      repairStation: ['', [Validators.required]],
      repairType: ['', [Validators.required]]
    });
    this.open(this.repairModal);

  }
  resetForm() {
    let repairType = 0;
    if (this.repairObj.formObj.value && this.repairObj.formObj.value.repairType) {
      repairType = parseFloat(this.repairObj.formObj.value.repairType.value);
    }
    if (repairType !== 1) {
      this.faultObj.formObj.reset();
    }
    if (repairType !== 2) {
      this.repairDetailObj.formObj.reset();
    }
    this.faultObj.formSubmitted = false;
    this.repairDetailObj.formSubmitted = false;
    this.levelTwoRepair.requiredFields = [];
  }
  getfaultModal(stepper) {
    this.faultObj.enableDelete = false;
    if (this.repairObj.formObj.valid) {
      this.repairObj.formSubmitted = true;
      const formValues = this.repairObj.formObj.value;
      this.repairTypeLevel = formValues.repairType.value;
      this.resetForm();
      if (parseFloat(this.repairObj.formObj.value.repairType.value) === 1 && (this.faultObj.formObj.controls['remarks'].value === '333')) {
        this.faultObj.formObj.controls['remarks'].setValue('');
      }
      if (parseFloat(this.repairObj.formObj.value.repairType.value) !== 3) {
        this.resetRepairActionForm();
      }
      if (formValues.repairType.value === 3) {
        this.getRepairActionList();
      }
    }
    const pickmodal = this.repairObj.formObj.value.pickerModel;
    this.repairObj.formObj.value.repairDates = pickmodal.month + '/' + pickmodal.day + '/' + pickmodal.year;
  }
  getReviewModal() {
    if (this.modOutData.length) {
      this.reviewObj.enableDelete = false;
      if (this.modObj.formObj.invalid) {
        this.modObj.formSubmitted = true;
      }

      this.list.forEach(list => {
        if (list.id === parseInt(this.repairObj.formObj.value.repairStation, 10)) {
          this.selectedRepairStation = list.fullName;
        }
      });
      const repairDates = this.repairObj.formObj.value.pickerModel;
      const dateTimes = new Date(repairDates.year + '-' + repairDates.month + '-' + repairDates.day);
      this.repairObj.formObj.value.repairDates = moment(dateTimes).format('YYYY-MM-DD HH:mm:ss');
    }
  }
  getSelectedDates(data) {
    this.isLoading = true;
    if (this.dataSource) {
      this.dataSource.data = [];
    }
    this.getFilterDate(data.fromDate, data.toDate);
  }
  resetFormData() {
    this.empMod = [];
    this.repairObj.formSubmitted = false;
    this.repairObj.isFormSubmitted = false;
    this.repairObj.loadVisible = false;
    this.faultObj.formSubmitted = false;
    this.faultObj.isFormSubmitted = false;
    this.repairDetailObj.formSubmitted = false;
    this.repairDetailObj.isFormSubmitted = false;
    this.reviewObj.formSubmitted = false;
    this.reviewObj.isFormSubmitted = false;
    this.modObj.formSubmitted = false;
    this.modObj.isFormSubmitted = false;
    this.removalObj.formSubmitted = false;
    this.removalObj.isFormSubmitted = false;
    this.selection.clear();
    this.removalObj.enableSerialInfo = false;
    this.searchFailed = false;
    this.createRemovalObj.formSubmitted = false;
    this.createRemovalObj.loadVisible = false;
    this.reviewObj.loadVisible = false;
    this.createRemovalObj.isFormSubmitted = false;
    this.createRemovalObj.selectedRow = [];
  }
  validateRemovalInfo(stepper) {
    const rivision = [];
    const rApi = this.removalObj.formObj.value.repairRevisionApi;
    const repairRevisionNumber = this.removalObj.formObj.value.repairRevisionNumber;

    if (rApi === '' || rApi === null || rApi === undefined) {
      rivision.push(1);
    }
    if (repairRevisionNumber === '' || repairRevisionNumber === null || repairRevisionNumber === undefined) {
      rivision.push(1);
    }

    if (!Object.keys(this.removalList).length || (this.modInData && !this.modInData.length) || (rivision.length === 2)) {
      this.removalObj.formObj.controls['repairRevision'].setValue(null);
      stepper.previous();
    } else {
      this.removalObj.formObj.controls['repairRevision'].setValue(1);
      stepper.next();
    }
  }
  removalFormSubmit(stepper, serialNo) {
    this.searchFailed = false;
    this.removalError = false;
    if (!serialNo) {
      this.searchFailed = true;
      return;
    }
    if (!Object.keys(this.removalList).length) {
      this.searchFailed = true;

    }
    this.removalObj.formSubmitted = true;
    this.removalError = true;

  }
  repairFormSubmit() {
    this.repairObj.formSubmitted = true;
    this.repairObj.loadVisible = false;
    if (this.repairObj.formObj.invalid) {
      this.repairObj.loadVisible = false;
      this.repairObj.formSubmitted = true;
      return;
    }

  }
  faultFormSubmit() {
    this.faultObj.formSubmitted = true;
    this.faultObj.loadVisible = false;
    if (this.faultObj.formObj.invalid) {
      this.faultObj.loadVisible = false;
      return;
    }
  }
  repairDetailFormSubmit(stepper) {
    this.repairDetailObj.formSubmitted = true;
    this.repairDetailObj.loadVisible = false;
    if (this.repairDetailObj.formObj.invalid) {
      this.repairDetailObj.loadVisible = false;
      return;
    }
    const formValues = this.repairObj.formObj.value;
    if (formValues.repairType.value === 2) {
      this.faultObj.formObj.controls['remarks'].setValue('333');
    } else if (formValues.repairType.value === 3) {
      this.faultObj.formObj.controls['remarks'].setValue('333');
    }
    const pickmodal = this.repairObj.formObj.value.pickerModel;
    this.repairObj.formObj.value.repairDates = pickmodal.month + '/' + pickmodal.day + '/' + pickmodal.year;
    stepper.next();
  }
  reviewFormSubmit() {
    this.reviewObj.isFormSubmitted = true;
    this.reviewObj.formSubmitted = true;
    this.reviewObj.loadVisible = true;
    if (this.reviewObj.formObj.invalid) {
      this.reviewObj.loadVisible = false;
    }
    this.reviewObj.formObj.isError = false;
    this.reviewObj.formObj.errorMsg = '';
    let repairDates = this.repairObj.formObj.value.pickerModel;
    const dateTimes = new Date(repairDates.year + '-' + repairDates.month + '-' + repairDates.day);
    repairDates = moment(dateTimes).format('YYYY-MM-DD HH:mm:ss');
    let repairStationVal = '';
    this.list.forEach(element => {
      if (element.id.toString() === this.repairObj.formObj.value.repairStation.toString()) {
        repairStationVal = element;
      }
    });
    const goNogo = this.repairDetailObj.formObj.value.repairDetailsType ? this.repairDetailObj.formObj.value.repairDetailsType.value : '';
    const removalformobjs = this.removalObj.formObj.value;
    const finalPostObj = {
      id: '',
      repairType: this.repairTypeLevel - 1,
      repairDate: repairDates,
      repairStationId: this.repairObj.formObj.value.repairStation,
      modDotOut: this.modOutData.toString(),
      repairTechnician: this.repairObj.formObj.value.techician,
      workOrder: this.repairObj.formObj.value.workOrder,
      removalId: this.allModelData['id'],
      createdAt: '',
      updatedAt: '',
      repairStation: repairStationVal,
      removal: {
        id: this.allModelData['id'],
        removalDate: this.allModelData['removalDate'],
        maintenanceStationId: this.allModelData['maintenanceStationId'],
        lruPartNumberId: this.allModelData['lruPartNumberId'],
        serialNumberOFF: this.allModelData['serialNumberOFF'],
        serialNumberON: '',
        aircraftId: this.allModelData['aircraftId'],
        modDotIn: this.modInData.toString(),
        otherReasonOfRemoval: '',
        revision: removalformobjs.repairRevisionApi + removalformobjs.repairRevisionNumber,
        createdAt: '',
        updatedAt: '',
        source: ''
      }
    };

    if (this.repairTypeLevel === 3) {
      const level2RepairDetailsObj = [];
      for (let i = 0; i < this.levelTwoRepair.repairDetails.length; i++) {
        level2RepairDetailsObj.push({
          repairActionId: this.levelTwoRepair.repairDetails[i].repairActionId,
          sruSerialNumberOff: this.levelTwoRepair.repairDetails[i].sruSerialNumberOff,
          sruSerialNumberOn: this.levelTwoRepair.repairDetails[i].sruSerialNumberOn
        });

      }
      finalPostObj['level2Repair'] = {
        comments: this.levelTwoRepair.comments,
        level2RepairDetails: level2RepairDetailsObj
      };
    } else if (this.repairTypeLevel === 1) {
      finalPostObj['noFaultFound'] = this.faultObj.formObj.value.remarks;
    } else if (this.repairTypeLevel === 2) {
      finalPostObj['level1Repair'] = {
        id: '',
        goNoGo: goNogo,
        remarks: this.repairDetailObj.formObj.value.repairDetailsRemark,
        repairId: '',
        createdAt: '',
        updatedAt: ''
      };
    }
    this.searchRepairError = false;
    this.repiarsService.createRepair(finalPostObj).subscribe((data) => {
      if (!data['message']) {
        this.commonObj.getCreateRepairInfo = [];
        this.repairData = data;
        if (this.repairData['modDotOut']) {
          this.modOutData = this.repairData['modDotOut'].split(',').map(i => {
            return parseInt(i, 10);
          });
        }
        const repairData: any = this.list;
        if (data && !repairData.error) {
          const msg = 'Repair was successfully created';
          this.repairSuccessHandler(data, { msg: msg, operation: 'Save Repair' });
        } else if (repairData.error) {
          this.reapairErrorHandler(repairData.error);
        }
      } else {
        this.reapairErrorHandler(data['error']);
      }
    });
    this.reviewObj.loadVisible = false;
  }
  repairSuccessHandler(data, toastr) {
    this.toaster.success(toastr.msg, toastr.operation);
    if (toastr.operation !== 'save reapair') {
      this.dataSource.data.push(data);
    }
    this.enablePrint = true;
  }
  resetFormsData() {
    this.repairObj.formObj.reset();
    this.faultObj.formObj.reset();
    this.reviewObj.formObj.reset();
    this.modObj.formObj.reset();
    this.repairObj.formObj.controls.repairStation.setValue('');
    const currentDates = {
      year: null,
      month: null,
      day: null
    };
    currentDates.year = new Date().getUTCFullYear();
    currentDates.month = new Date().getUTCMonth() + 1;
    currentDates.day = new Date().getUTCDate();
    this.repairObj.formObj.controls.pickerModel.setValue(currentDates);
    this.repairDetailObj.formObj.reset();
    this.createRemovalObj.formObj.reset();
    this.levelTwoRepair.comments = null;
    this.levelTwoRepair.repairDetails = [
      {
        repairActionId: '',
        sruSerialNumberOff: '',
        sruSerialNumberOn: '',
        repairActionIdValue: ''
      }
    ];
  }
  reapairErrorHandler(error) {
    this.reviewObj.isFormSubmitted = false;
    this.reviewObj.formObj.isError = true;
    this.reviewObj.formObj.errorMsg =
      error.message || error.error_description;
  }
  modFormSubmit(stepper) {
    if (stepper) {
      if (!this.modOutData.length) {
        stepper.previous();
        return;
      }
      this.modObj.formSubmitted = true;
      if (this.modObj.formObj.controls && this.modObj.formObj.controls.repairRevision) {
        this.modObj.formObj.controls.repairRevision.setValue(1);
      }
      stepper.next();
    }
  }
  createFormSubmit() {
    this.createRemovalObj.modDotInRequired = false;
    this.createRemovalObj.formSubmitted = true;
    const rivisonerr = [];
    const rApi = this.createRemovalObj.formObj.value.repairRevisionApi;
    const rNo = this.createRemovalObj.formObj.value.repairRevisionNumber;
    if (rApi === '' || rApi === null || rApi === undefined) {
      rivisonerr.push(1);
    }
    if (rNo === '' || rNo === null || rNo === undefined) {
      rivisonerr.push(1);
    }
    if (rivisonerr.length === 2 || this.createRemovalObj.formObj.invalid) {
      this.createRemovalObj.loadVisible = false;
      return;
    }

    if (this.empMod && !this.empMod.length) {
      this.createRemovalObj.modDotInRequired = true;
      return;
    } else {
      this.createRemovalObj.modDotInRequired = false;
    }

    this.createRemovalObj.loadVisible = true;
    let removalDate = this.createRemovalObj.formObj.value.pickerModel;
    const dateTime = new Date(removalDate.year + '-' + removalDate.month + '-' + removalDate.day);
    removalDate = moment(dateTime).format('YYYY-MM-DD HH:mm:ss');

    let maintenanceSationVal = '';
    this.maintenancedata.forEach(element => {
      if (element.id.toString() === this.createRemovalObj.formObj.value.maintenanceSation.toString()) {
        maintenanceSationVal = element;
      }
    });
    let reasonOfRemovalValue = '';
    this.ReasonData.forEach(element => {
      if (element.id.toString() === this.createRemovalObj.formObj.value.repairReasonOfRemoval.toString()) {
        reasonOfRemovalValue = element;
      }
    });

    let lruPartNumberValue = '';
    this.LruNumberData.forEach(element => {
      if (element.id.toString() === this.createRemovalObj.formObj.value.repairlruPartNumber.toString()) {
        lruPartNumberValue = element;
      }
    });

    let airlineData;
    this.airData.forEach(element => {
      if ((element.icao && element.icao.toString()) === this.createRemovalObj.formObj.value.repairAiline.toString()) {
        airlineData = element;
      }
    });

    const api = this.createRemovalObj.formObj.value.repairRevisionApi;
    const getRevision = api + '' + this.createRemovalObj.formObj.value.repairRevisionNumber;

    let getTailName = '';
    this.tailsData.forEach((element) => {
      if (element.id.toString() === this.createRemovalObj.formObj.value.repairTail.toString()) {
        getTailName = element.tailNumber;
      }
    });
    this.removalObj.formObj.controls['serialNumber'].setValue(this.createRemovalObj.formObj.value['lruSerialNumber']);
    const postObj = {
      removalDate: removalDate,
      maintenanceStationId: this.createRemovalObj.formObj.value.maintenanceSation,
      lruPartNumberId: this.createRemovalObj.formObj.value.repairlruPartNumber,
      serialNumberOFF: this.createRemovalObj.formObj.value.lruSerialNumber,
      serialNumberON: '',
      modDotIn: this.empMod.toString(),
      otherReasonOfRemoval: '',
      revision: getRevision,
      aircraftId: this.createRemovalObj.formObj.value.repairTail,
      createdAt: '',
      updatedAt: '',
      airlineName: airlineData.name,
      tailSign: getTailName,
      maintenanceStation: maintenanceSationVal,
      reasonOfRemoval: reasonOfRemovalValue,
      lruPartNumber: lruPartNumberValue
    };
    this.createRemovalObj.formSubmitted = true;
    this.createRemovalObj.isError = false;
    this.allModelData = postObj;
    this.createRemovalObj.moddotinRequired = false;

    this.repiarsService.createRemoval(postObj).subscribe((data) => {
      this.searchRepairError = false;
      this.allModelData['id'] = data['id'];
      this.removalList = data;
      this.summaryRevision = data['revision'];
      if (Object.keys(data).indexOf('reasonOfRemoval') === -1) {
        this.reasonOfRemoval = data['otherReasonOfRemoval'];
      } else if (data && data['reasonOfRemoval'] && data['reasonOfRemoval']['description']) {
        this.reasonOfRemoval = data['reasonOfRemoval'].description;
      }
      this.removalObj.formObj.controls['repairRevision'].setValue(data['modDotIn']);
      this.levelTwoRepair.repairActionLruPartNoId = data;
      if (!this.removalList.error) {
        if (this.removalList['modDotIn']) {
          this.modInData = this.removalList['modDotIn'].split(',').map(i => {
            return parseInt(i, 10);
          });
          this.modOutData = this.removalList['modDotIn'].split(',').map(i => {
            return parseInt(i, 10);
          });
          if (this.removalList['modDotOut']) {
            this.modOutData = this.removalList['modDotOut'].split(',').map(i => {
              return parseInt(i, 10);
            });
          }
          this.empMod.push(...this.modInData);
        }

        const rrapi = this.createRemovalObj.formObj.value.repairRevisionApi;
        const repairRevisionApi = (rrapi !== null && rrapi !== undefined && rrapi !== '') ? rrapi : '';
        this.removalObj.formObj.controls['repairRevisionApi'].setValue(repairRevisionApi, { onlySelf: true });

        const rrno = this.createRemovalObj.formObj.value.repairRevisionNumber;
        const repairRevisionNumber = (rrno !== null && rrno !== undefined && rrno !== '') ? parseInt(rrno, 10) : '';
        this.removalObj.formObj.controls['repairRevisionNumber'].setValue(repairRevisionNumber, { onlySelf: true });


        this.removalObj.enableSerialInfo = true;
        this.removalObj.isLoading = false;
        this.createRemovalObj.isLoading = true;
        this.searchFailed = false;
        if (this.removalObj.modalRef) {
          this.removalObj.modalRef.close();
        }
        this.createRemovalObj.formSubmitted = false;
        this.createRemovalObj.loadVisible = false;
      } else if (this.removalList.error) {
        this.createRemovalObj.isLoading = false;
        this.createRemovalObj.loadVisible = false;
        const error = this.removalList;
        this.createRemovalObj.isError = true;
        this.createRemovalObj.errorMsg = (error.error && (error.error.message || error.error.error_description)) || error.statusText;
      }
    });
  }
  getFilterDate(fromDate, toDate) {
    const dateObj = this.dateService.getDates(new Date(fromDate), new Date(toDate));
    this.fromDate = dateObj.fromDate;
    this.toDate = dateObj.toDate;
  }
  open(content) {
    this.removalObj.modalRef = this.modalService.open(
      content,
      { centered: true, windowClass: 'hugeModal' }
    );
    this.removalObj.modalRef.result.then((result) => { }, reason => {
      this.removalError = false;
    });
    this.closeAllWindow.push(this.removalObj.modalRef);
  }
  closeModal() {
    this.repairObj.modalRef.close();
    this.removalObj.modalRef.close();
  }
  repairList() {
    this.repiarsService.getRepair().subscribe((data) => {
      this.list = data;
      this.list.sort((a, b) => (a.fullName.toLowerCase() > b.fullName.toLowerCase()) ? 1 :
        ((b.fullName.toLowerCase() > a.fullName.toLowerCase()) ? -1 : 0));
    });
  }
  getRepairRevisionData() {
    if (this.removalObj.formObj.value) {
      this.summaryRevision = this.removalObj.formObj.value.repairRevisionApi + this.removalObj.formObj.value.repairRevisionNumber;
    }
  }
  getLruSerial(data) {
    this.repairDetailObj.formObj.reset();
    this.faultObj.formObj.reset();
    this.levelTwoRepair.comments = null;
    this.modInData = [];
    this.modOutData = [];
    this.selectedModDotOutData = [];
    this.removalObj.formObj.controls['repairRevisionApi'].setValue(null);
    this.removalObj.formObj.controls['repairRevisionNumber'].setValue(null);
    this.summaryRevision = '';
    this.reviewObj.formObj.isError = false;
    this.createRemovalObj.formObj.reset();
    this.createRemovalObjects = {
      loadLruPartNo: true,
      loadReasonOfRemoval: true
    };
    this.searchRepairError = false;
    if (!data) {
      this.searchFailed = true;
      return;
    }
    this.removalObj.isLoading = true;
    this.serialNumber = data;
    this.repiarsService.getLru(this.serialNumber).subscribe(res => {
      this.resetFormsData();
      this.modOutData = [];
      this.commonObj.getCreateRepairInfo = [];
      if (!res['message']) {
        this.allModelData = res;
        this.levelTwoRepair.repairActionLruPartNoId = res;
        if (res['modDotIn']) {
          this.modInData = res['modDotIn'].split(',').map(i => {
            return parseInt(i, 10);
          });
          this.modOutData = res['modDotIn'].split(',').map(i => {
            return parseInt(i, 10);
          });
          this.empMod.push(...this.modInData);
        } else {
          this.modInData = [];
          this.modOutData = [];
        }

        let revisionObj = [];
        if (res['revision']) {
          revisionObj = res['revision'].split('');
        }

        if (!res['revision']) {
          this.removalObj.formObj.controls['repairRevisionApi'].setValue('', { onlySelf: true });
          this.removalObj.formObj.controls['repairRevisionNumber'].setValue('', { onlySelf: true });
        } else {
          this.removalObj.formObj.controls['repairRevisionApi'].setValue(revisionObj[0], { onlySelf: true });
          let repairRevisionNumber: any = '';
          if (revisionObj[1] !== null && revisionObj[1] !== undefined && revisionObj[1] !== '') {
            repairRevisionNumber = parseInt(revisionObj[1], 10);
          }
          this.removalObj.formObj.controls['repairRevisionNumber'].setValue(repairRevisionNumber, { onlySelf: true });
        }
      }
      if (res['message']) {
        this.searchFailed = true;
        this.searchRepairError = true;
        this.removalObj.enableSerialInfo = false;
        this.removalObj.isLoading = false;
        this.removalList = {};
      } else {
        this.searchRepairError = false;
        this.removalList = res;
        this.summaryRevision = res['revision'];
        if (Object.keys(res).indexOf('reasonOfRemoval') === -1) {
          this.reasonOfRemoval = res['otherReasonOfRemoval'];
        } else if (res && res['reasonOfRemoval'] && res['reasonOfRemoval']['description']) {
          this.reasonOfRemoval = res['reasonOfRemoval'].description;
        }
        this.removalObj.formObj.controls['repairRevision'].setValue(res['modDotIn']);
        this.removalObj.enableSerialInfo = true;
        this.removalObj.formSubmitted = true;
        this.searchFailed = false;
        this.removalObj.isLoading = false;
        if (this.removalObj.formObj.invalid) {
          return;
        }
      }
    }, err => {
      this.searchFailed = true;
      this.removalObj.enableSerialInfo = false;
      this.removalObj.isLoading = false;
    });
  }
  getMaintenanceStationsList() {
    this.repiarsService.getMaintenanceStationlist().subscribe(list => {
      this.maintenancedata = list;
      this.commonObj.getCreateRepairInfo.push(1);
    });
  }
  getAirline() {
    this.repiarsService.getAirlinelist().subscribe(list => {
      this.airData = list;
      this.commonObj.getCreateRepairInfo.push(1);
    });
  }

  getLruNameList() {
    this.repiarsService.getLruName().subscribe(list => {
      this.lurNameData = list;
      this.isTail = true;
      this.commonObj.getCreateRepairInfo.push(1);
    });
  }
  getLruPartNumberList(id) {
    this.createRemovalObj.formObj.controls.repairlruPartNumber.setValue('');
    this.createRemovalObj.formObj.controls.repairReasonOfRemoval.setValue('');
    this.createRemovalObjects.loadLruPartNo = true;
    this.createRemovalObjects.loadReasonOfRemoval = true;
    if (id) {
      this.repiarsService.getLruPartNumber(id).subscribe(data => {
        this.LruNumberData = data;
        this.createRemovalObjects.loadLruPartNo = false;
      });
    } else {
      this.LruNumberData = [];
    }
  }
  reasonRemovalList(id) {
    this.createRemovalObj.formObj.controls.repairReasonOfRemoval.setValue('');
    this.createRemovalObjects.loadReasonOfRemoval = true;
    if (id) {
      this.repiarsService.ReasonRemoval(id).subscribe(data => {
        this.ReasonData = data;
        this.createRemovalObjects.loadReasonOfRemoval = false;
      });
    } else {
      this.ReasonData = [];
    }
  }
  getAircraftList(id: number) {
    if (id) {
      this.repiarsService.getTails(id).subscribe(list => {
        if (!list['error']) {
          this.tailsData = list;
          this.tailsData.sort((a, b) => (a.tailNumber > b.tailNumber) ? 1 : ((b.tailNumber > a.tailNumber) ? -1 : 0));
        } else if (list['error']) {
          this.tailsData = [];
        }
        if (id) {
          this.createRemovalObj.formObj.get('repairTail').enable();
        }
      });
    } else if (!id) {
      this.createRemovalObj.formObj.get('repairTail').disable();
      this.createRemovalObj.formObj.controls['repairTail'].setValue('');

    }
  }
  selectedBtn(id) {
    if (this.empMod.indexOf(id) === -1) {
      this.empMod.push(id);
    } else {
      const getSelectedElem = [];
      for (let i = 0; i < this.empMod.length; i++) {
        if (this.empMod[i] !== id) {
          getSelectedElem.push(this.empMod[i]);
        }
      }
      this.empMod = getSelectedElem;

    }
    if (this.empMod && this.empMod.length) {
      this.createRemovalObj.modDotInRequired = false;
    } else {
      this.createRemovalObj.modDotInRequired = true;
    }
  }
  selecteModDotIn(id) {
    if (this.modInData.indexOf(id) === -1) {
      this.modInData.push(id);
    } else {
      const getSelectedElem = [];
      for (let i = 0; i < this.modInData.length; i++) {
        if (this.modInData[i] !== id) {
          getSelectedElem.push(this.modInData[i]);
        }
      }
      this.modInData = getSelectedElem;
    }
  }
  selectedBtnOut(id) {
    if (this.selectedModDotOutData.indexOf(id) === -1) {
      this.selectedModDotOutData.push(id);
    } else {
      let index;
      for (let i = 0; i < this.selectedModDotOutData.length; i++) {
        if (id === this.selectedModDotOutData[i]) {
          index = i;
        }
      }
      this.selectedModDotOutData.splice(index, 1);
    }
    this.selectedModDotOutData = this.selectedModDotOutData.filter(function (value, index, array) {
      return array.indexOf(value) === index;
    });
    this.modOutData = [...this.selectedModDotOutData, ...this.modInData];
  }
  modFilterMouseDown(filter) {
    this.modMouseDownFilter = filter;
    this.modFilter === filter ? this.modActiveFilterMouseDown = true : this.modInActiveFilterMouseDown = true;
  }

  modFilterMouseUp() {
    this.modActiveFilterMouseDown = false;
    this.modInActiveFilterMouseDown = false;
  }

  /** Level 2 Repair **/
  resetRepairActionForm() {
    this.levelTwoRepair.repairDetails = [
      {
        repairActionId: '',
        sruSerialNumberOff: '',
        sruSerialNumberOn: '',
        repairActionIdValue: ''
      }
    ];
    this.levelTwoRepair.comments = null;
    this.levelTwoRepair.requiredFields = [];
  }
  getRepairActionDetailsSubmit(stepper) {
    this.levelTwoRepair.requiredFields = [];
    this.levelTwoRepair.maxLength = [];
    this.levelTwoRepair.isFormSubmitted = true;
    this.levelTwoRepair.repairDetails.forEach((repairDetail, indx) => {
      if (repairDetail.repairActionId.length === 0) {
        this.levelTwoRepair.requiredFields.push(indx);
      }
      if (repairDetail.sruSerialNumberOff.length >= 45 || repairDetail.sruSerialNumberOn.length >= 45) {
        this.levelTwoRepair.maxLength.push(indx);
      }
    });
    if (!this.levelTwoRepair.requiredFields.length && !this.levelTwoRepair.maxLength.length) {

      // validation for comment section
      if (this.levelTwoRepair.comments !== null && this.levelTwoRepair.comments.length >= 255) {
        return false;
      }
      if (!this.levelTwoRepair.comments) {
        return true;
      }
      this.levelTwoRepair.isFormSubmitted = false;
      this.repairTypeLevel = 3;
      this.faultObj.formObj.controls['remarks'].setValue('333');
      stepper.next();
    }
  }
  getRepairAction() {
    this.levelTwoRepair = {
      repairActionLruPartNoId: null,
      isFormSubmitted: false,
      requiredFields: [],
      repairDetails: [
        {
          repairActionId: '',
          sruSerialNumberOff: '',
          sruSerialNumberOn: '',
          repairActionIdValue: ''
        }
      ],
      comments: null,
      repairActionsList: [],
      getRepairActionsList: false,
      isValid: []
    };
  }

  getRepairActionList() {
    if (this.levelTwoRepair.repairActionsList && !this.levelTwoRepair.repairActionsList.length) {
      this.levelTwoRepair.getRepairActionsList = true;
      this.repiarsService.getRepairActions(this.levelTwoRepair.repairActionLruPartNoId.lruPartNumberId).subscribe((list) => {
        this.levelTwoRepair.getRepairActionsList = false;
        if (!list['error']) {
          this.levelTwoRepair.repairActionsList = list;
        }
      });
    }
  }

  addDeleteRepair(params, index?: any) {
    if (params === 'add') {
      if (this.levelTwoRepair.repairDetails.length !== 5) {
        this.levelTwoRepair.repairDetails.push({
          repairActionId: '',
          sruSerialNumberOff: '',
          sruSerialNumberOn: '',
          repairActionIdValue: ''
        });
      }
    } else if (params === 'delete') {
      this.levelTwoRepair.repairDetails.splice(index, 1);
    }
  }

  getRepairType(repairTypes) {
    if (parseFloat(repairTypes.value) === 3) {
      this.open(this.level2Repair);
    }
  }

  validationSerialNo(val) {
    if (val) {
      this.removalObj.serailNoPattern = false;
      const isValid = /^[_.a-zA-Z0-9- ]+([-.][a-zA-z0-9 ]+)*$/.test(val);
      if (!isValid) {
        this.removalObj.serailNoPattern = true;
      }
    }
  }

  validation(val, index, option) {
    this.levelTwoPatternValidation.comm = false;
    const isValid = /^[_.a-zA-Z0-9- ]+([-.][a-zA-z0-9 ]+)*$/.test(val);
    if (!isValid && val) {
      if (option === 'comm') {
        this.levelTwoPatternValidation.comm = true;
      }
      if (option === 'on') {
        this.levelTwoPatternValidation.on[index] = true;
      }
      if (option === 'off') {
        this.levelTwoPatternValidation.off[index] = true;
      }
    } else {
      if (option === 'comm') {
        this.levelTwoPatternValidation.comm = false;
      }
      if (option === 'on') {
        this.levelTwoPatternValidation.on[index] = false;
      }
      if (option === 'off') {
        this.levelTwoPatternValidation.off[index] = false;
      }
    }
  }

  selectionChange(event) {
    this.getReviewModal();
    this.modOutData = [...this.selectedModDotOutData, ...this.modInData];
    this.modOutData = this.modOutData.filter(function (value, index, array) {
      return array.indexOf(value) === index;
    });
    if (event.selectedIndex === 1) {
      if (!this.modOutData.length) {
        this.modOutData = JSON.parse(JSON.stringify(this.modInData));
      }
    }
    if (!this.repairObj.formObj.controls.techician.value) {
      this.repairObj.formObj.controls.techician.setValue(this.userEmail);
    }
  }

  printRepair(divName) {
    this.printService.print(divName, 'Removal and Repair Details');

    this.resetRepairActionForm();
    this.modOutData = [];
    this.resetFormData();
    this.selection.clear();
    for (let i = 0; i < this.closeAllWindow.length; i++) {
      this.closeAllWindow[i].close();
    }
    this.resetFormsData();
    this.removalObj.formObj.reset();
    this.reviewObj.isFormSubmitted = false;
  }
}

