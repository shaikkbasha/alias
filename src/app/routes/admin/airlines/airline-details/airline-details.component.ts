import { Component, OnInit, ViewChild, TemplateRef, ElementRef } from '@angular/core';
import { AirlineService } from 'src/app/shared/services/admin/airline/airline.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Airline } from 'src/app/shared/services/admin/airline/airline';
import { AirlineConfiguration } from './airline-configuration';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Airlines } from '../airlines';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment.staging';
import { FileUploader } from 'ng2-file-upload';
import { OktaAuthService } from '@okta/okta-angular';
import { AirlineIssue } from './airline-issue';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, Validators } from '@angular/forms';
const API = `${environment.API}`;

@Component({
  selector: 'app-airline-details',
  templateUrl: './airline-details.component.html',
  styleUrls: ['./airline-details.component.css']
})
export class AirlineDetailsComponent implements OnInit {

  currentAirline: Airline;
  updatedTime: any;
  isLoading = false;
  selectedTabIndex = 0;
  isLoadingConfiguration = false;
  configurationDataSource: any = [];
  selection: any = new SelectionModel<Airlines>(false, []);
  @ViewChild('configurationPaginator') configurationPaginator: MatPaginator;
  @ViewChild('configurationSort') configurationSort: MatSort;
  configurationDisplayColumn: string[] = [
    'select',
    'configurationName',
    'hasSeatsUploaded',
    'createdDate',
    'updatedDate'
  ];
  airLineDetailObj = {
    formObj: null,
    errorMsg: null,
    formSubmitted: false,
    modalRef: null,
    isFormSubmitted: false,
    isError: false,
    selectedRow: [],
    isDeleted: false,
    enableDelete: false,
    radioList: {
      fixExists: [
        { name: 'Yes', value: true },
        { name: 'No', value: false }
      ],
      status: [
        { name: 'Active', value: 'active' },
        { name: 'InActive', value: 'inactive' }
      ]
    }
  };
  actionToolBarConfig = {
    createLabel: 'Create Configuration',
    moduleName: 'configuration',
    id: 'btn-create-configuration',
    enableSearch: true,
    enableCreate: true,
    filterIds: {
      filterListId: 'filter-airline-list',
      filterText: 'inp-filter-airline-text'
    },
    buttonList: [
      {
        label: 'Upload Seats Data',
        icon: 'fa fa-upload',
        id: 'btn-upload-configuration',
        eventName: 'upload'
      }
    ]
  };
  @ViewChild('configurationModal') private configurationModal: TemplateRef<any>;
  hasBaseDropZoneOver: boolean;
  uploader: FileUploader;
  @ViewChild('uploaderInput') uploaderinput: ElementRef;
  token: any;
  tokenString: string;
  authTokenValue: string;
  URL = API + '/api/v1/configurations/{configurationId}/upload-seat-data';
  uploadConfigurationDataSource: any = [];
  uploadConfigurationDisplayedColumns: string[] = [
    'fileName',
    'fileProgress',
    'fileStatus',
    'fileReady'
  ];


  // Airline Issue attributes
  issueDisplayColumn: string[] = [
    'name',
    'description',
    'fixExists',
    'status',
    'createdAt',
    'updatedAt',
    'actions'
  ];
  issueDataSource: any = [];
  isIssueLoading = false;
  @ViewChild('issuePaginator') issuePaginator: MatPaginator;
  @ViewChild('issueSort') issueSort: MatSort;
  @ViewChild('issueModal') private issueModal: TemplateRef<any>;


  constructor(
    private airlineService: AirlineService,
    private route: ActivatedRoute,
    public modalService: NgbModal,
    private oktaAuth: OktaAuthService,
    public toaster: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.authTokenValue = '';
    this.tokenString = '';
    this.token = '';

    this.getToken();
    this.authTokenValue = 'Bearer' + this.token;

    this.uploader = new FileUploader({
      url: this.URL,
      disableMultipart: false,
      autoUpload: false,
      isHTML5: true,
      authToken: this.authTokenValue,
      queueLimit: 1
    });
    this.uploader.onProgressItem = (fileItem: any, progress: any) => {
      fileItem.progress = progress;
      this.onFileUpload(fileItem);
    };
  }

  ngOnInit() {
    this.loadData();

    this.airLineDetailObj.formObj = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(60), Validators.pattern('^[A-Za-z0-9" "]*$')]],
      description: ['', [Validators.required, Validators.maxLength(60), Validators.pattern('^[A-Za-z0-9" "]*$')]],
      fixExists: [false, []],
      status: ['active', []],
      id: ['']
    });

    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.onFileUpload('');
    };

    this.uploader.onAfterAddingFile = (fileItem) => {
      if (this.uploader.queue.length > 1) {
        this.uploader.removeFromQueue(this.uploader.queue[0]);
      } else {
        this.onFileUpload('');
      }
    };

    this.uploader.onBeforeUploadItem = (item: any) => {
      item.url = API + '/api/v1/configurations/' + this.selection.selected[0].id + '/upload-seat-data';
      item.withCredentials = false;
      this.onFileUpload('');
    };
  }

  loadData() {
    const currentAirlineId = this.route.snapshot.paramMap.get('airlineIcao');
    this.airlineService.getAirlineByIcao(currentAirlineId)
      .subscribe(airline => {
        this.updatedTime = new Date();
        const data: any = airline;
        if (!data.error) {
          this.currentAirline = data[0];
          this.isLoading = true;
          this.getConfigrationByIcao(this.currentAirline.icao);
          this.getIssues(this.currentAirline.icao);
        } else {
          this.currentAirline = null;
          this.router.navigate(['admin/airlines']);
        }
      });
  }

  /**
 * check the active tab
 * 0:tails tab, 1:configurations tab, 2:issues tab
 */
  tabChange(event) {
    this.selectedTabIndex = event.index;
    if (event.index === 1) {
      this.actionToolBarConfig.createLabel = 'Create Configuration';
      this.actionToolBarConfig.id = 'btn-create-configuration';
      this.actionToolBarConfig.moduleName = 'configuration';
      this.actionToolBarConfig.buttonList[0].id = 'btn-upload-configuration';
      this.actionToolBarConfig.buttonList[0].eventName = 'upload';
      this.actionToolBarConfig.buttonList[0].icon = 'fa fa-upload';
      this.actionToolBarConfig.buttonList[0].label = 'Upload Seats Data';
    } else if (event.index === 2) {
      this.actionToolBarConfig.createLabel = 'Create Issue';
      this.actionToolBarConfig.id = 'btn-create-issue';
      this.actionToolBarConfig.moduleName = 'issue';
      this.actionToolBarConfig.buttonList.splice(1, 1);
    }
  }

  /**
 * get airline configuration list
 */
  getConfigrationByIcao(icao) {
    this.isLoadingConfiguration = true;
    this.configurationDataSource.data = [];
    this.airlineService.getAirlineConfigrationsByIcao(icao).subscribe(list => {
      const data: any = list;
      this.configurationDataSource = new MatTableDataSource<AirlineConfiguration>(data);
      this.isLoadingConfiguration = false;
      this.configurationDataSource.paginator = this.configurationPaginator;
      this.configurationDataSource.sort = this.configurationSort;
    });
  }

  /** select row for airline & airline configuration */
  selectedRow() {
    if (this.selection.selected.length === 1) {
      this.airLineDetailObj.selectedRow = this.selection.selected;
    }
  }

  /** Filter for airline and airline configuration */
  searchfilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Data source defaults to lowercase matches
    if (this.selectedTabIndex === 1) { // for configuration tab
      this.configurationDataSource.filter = filterValue;
      this.isLoadingConfiguration = false;
    } else if (this.selectedTabIndex === 2) { // for issue tab
      this.issueDataSource.filter = filterValue;
      this.isIssueLoading = false;
    }
  }

  getEvent(params) {
    // airline configuration modal.
    if (params.moduleName === 'configuration' && params.eventName === 'upload') {
      this.open(this.configurationModal);
    } else if (params.moduleName === 'issue') {
      this.airLineDetailObj.enableDelete = false;
      this.airLineDetailObj.formObj.setValue({
        name: '',
        description: '',
        fixExists: false,
        status: 'active',
        id: ''
      });
      this.open(this.issueModal);
    }
  }

  open(content) {
    this.airLineDetailObj.modalRef = this.modalService.open(content, {
      centered: true,
      size: 'lg'
    });
  }
  closeModal() {
    if (this.airLineDetailObj.modalRef) {
      this.airLineDetailObj.modalRef.close();
    }
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public getToken() {
    this.oktaAuth.getAccessToken().then(data => {
      this.token = data;
      const authTokenValue = 'Bearer ' + this.token;
      this.uploader.authToken = authTokenValue;
    });
  }

  /**
   * status of uploading enhance seat files
   */
  onFileUpload(item) {
    const obj = [];
    this.uploader.queue.forEach((fileObj, i) => {
      let status = '';
      let responseTxt = '';
      let code = '';
      const action = false;
      if (fileObj._xhr && fileObj._xhr.responseText !== '') {
        const text = fileObj._xhr.responseText.toString().split(':');
        responseTxt = text[2].toString().split(',')[0].split('"')[1];
        code = text[1].toString().split(',')[0];
      }
      if (fileObj.isSuccess && (code === '' || code === '200')) {
        status = 'Success';
        const data = this.configurationDataSource.data;
        for (let j = 0; j < data.length; j++) {
          if (this.selection.selected[0].id === data[j].id) {
            data[j].hasSeatsUploaded = true;
          }
        }
      }
      if (fileObj.isSuccess && code !== '200') {
        status = 'Error';
      }
      if (fileObj.isCancel) {
        status = 'Cancel';
      }
      if (fileObj.isUploading) {
        status = 'Uploading';
      }
      if (fileObj.isError) {
        status = 'Error';
      }
      if (item === '' || (item !== '' && item !== fileObj._file.name)) {
        obj.push({
          fileName: fileObj._file.name,
          fileSize: fileObj._file.size,
          fileProgress: fileObj.progress,
          fileStatus: status,
          fileReady: action,
          fileEvents: fileObj,
          responseVal: responseTxt
        });
      }
    });
    this.uploadConfigurationDataSource = obj;
  }

  removeFiles(item?) {
    this.uploader.clearQueue();
    this.onFileUpload(item || '');
  }

  uploadConfiguration() {
    this.uploader.uploadAll();
    this.onFileUpload('');
  }
  /************************************ End of configuration */

  /**
   *  get airline issues
   */
  getIssues(icao) {
    this.isIssueLoading = true;
    this.issueDataSource.data = [];
    this.airlineService.getAirlineIssuesByIcao(icao).subscribe(data => {
      this.issueDataSource = new MatTableDataSource<AirlineIssue>(data);
      this.issueDataSource.paginator = this.issuePaginator;
      this.issueDataSource.sort = this.issueSort;
      this.isIssueLoading = false;
    });
  }

  resetIssueFormData() {
    this.airLineDetailObj.formSubmitted = false;
    this.airLineDetailObj.isFormSubmitted = false;
    this.airLineDetailObj.formObj.reset();
    this.airLineDetailObj.selectedRow = [];
    this.searchfilter('');
  }


  airlineIssueFormSubmit() {
    this.airLineDetailObj.formSubmitted = true;
    if (this.airLineDetailObj.formObj.invalid) {
      return;
    }
    this.airLineDetailObj.isFormSubmitted = true;
    if (!this.airLineDetailObj.formObj.value.id) {
      this.createAirlineIssue();
    } else if (this.airLineDetailObj.formObj.value.id) {
      this.updateAirlineIssue();
    }
  }

  createAirlineIssue() {
    this.airlineService.createAirlineIssue(this.currentAirline.icao, this.airLineDetailObj.formObj.value)
      .subscribe(list => {
        const data: any = list;
        if (data && !data.error) {
          const msg = this.airLineDetailObj.formObj.value.name + ' issue was successfully created';
          this.airlineDetailOperationSuccessHandler(data, { msg: msg, operation: 'Create Issue' });
        } else if (data.error) {
          this.airlineDetailOperationErrorHandler(data.error);
        }
      });
  }

  editIssueAirline(issue) {
    this.airLineDetailObj.enableDelete = false;
    this.open(this.issueModal);
    this.airLineDetailObj.selectedRow = issue;
    this.airLineDetailObj.formObj.setValue({
      name: issue.name,
      description: issue.description,
      fixExists: issue.fixExists,
      status: issue.status,
      id: issue.id
    });
  }

  updateAirlineIssue() {
    this.airlineService.updateAirlineIssue(this.currentAirline.icao, this.airLineDetailObj.formObj.value)
      .subscribe(list => {
        console.log('update list = ', list);
        const data: any = list;
        if (data && !data.error) {
          const msg = this.airLineDetailObj.formObj.value.name + ' issue was successfully updated';
          const index = this.issueDataSource.data.indexOf(this.airLineDetailObj.selectedRow);
          this.issueDataSource.data.splice(index, 1);
          this.airlineDetailOperationSuccessHandler(data, { msg: msg, operation: 'Update Issue' });
        } else if (data.error) {
          this.airlineDetailOperationErrorHandler(data.error);
        }
      });
  }

  deleteIssue(issue) {
    this.airLineDetailObj.enableDelete = true;
    this.open(this.issueModal);
    this.airLineDetailObj.selectedRow = issue;
    this.airLineDetailObj.formObj.setValue({
      name: issue.name,
      description: issue.description,
      fixExists: issue.fixExists,
      status: issue.status,
      id: issue.id
    });
  }

  deleteIssueAirline() {
    this.airLineDetailObj.isDeleted = true;
    this.airlineService
      .deleteAirlineIssue(this.currentAirline.icao, this.airLineDetailObj.formObj.value.id)
      .subscribe(response => {
        const data: any = response;
        if (!data) {
          const msg = this.airLineDetailObj.formObj.value.name + ' issue was successfully deleted';
          const index = this.issueDataSource.data.indexOf(this.airLineDetailObj.selectedRow);
          this.issueDataSource.data.splice(index, 1);
          this.airlineDetailOperationSuccessHandler('', { msg: msg, operation: 'Delete Issue' });
          this.airLineDetailObj.isDeleted = false;
        } else if (data && data.error) {
          this.airLineDetailObj.isError = true;
          this.airLineDetailObj.isDeleted = false;
          this.airLineDetailObj.errorMsg = data.error.message;
        }
      });
  }

  airlineDetailOperationSuccessHandler(data, toastr) {
    if (toastr.operation !== 'Delete Issue') {
      this.issueDataSource.data.push(data);
    }
    this.toaster.success(toastr.msg, toastr.operation);
    this.resetIssueFormData();
    this.selection.clear();
    this.searchfilter('');
    this.closeModal();
  }

  airlineDetailOperationErrorHandler(error) {
    this.airLineDetailObj.isFormSubmitted = false;
    this.airLineDetailObj.formObj.isError = true;
    this.airLineDetailObj.formObj.errorMsg =
      error.message || error.error_description;

  }

}
