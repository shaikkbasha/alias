import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUploader, FileItem } from 'ng2-file-upload';
import { OktaAuthService } from '@okta/okta-angular';
import { environment } from '../../../environments/environment';
import { MatPaginator, MatSort } from '@angular/material';
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  displayedColumns: string[] = ['fileName', 'fileSize', 'fileProgress', 'fileStatus', 'fileReady'];
  responseStr: any = {};
  dataSource: any = [];
  uploader: FileUploader;
  isLoading = false;
  token: any;
  tokenString: string;
  authTokenValue: string;
  hasBaseDropZoneOver: boolean;
  @ViewChild('uploaderInput') uploaderinput: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('rsSort') rsSort: MatSort;
  hasAnotherDropZoneOver: boolean;
  uploaderOptions: any = {};
  navigationSubscription;
  actionToolBarConfig = {
    createLabel: '',
    moduleName: 'upload',
    enableSearch: false,
    id: 'btn-upload',
    enableCreate: false,
    uploadButtonList: [
      {
        label: 'Delete All',
        icon: 'fa fa-trash',
        id: 'btn-upload-delete',
        eventName: 'delete'
      },
      {
        label: 'Cancel All',
        icon: 'fa fa-times',
        id: 'btn-upload-cancel',
        eventName: 'cancel'
      },
      {
        label: 'Upload All',
        icon: 'fa fa-cloud-upload',
        id: 'btn-upload-uploadall',
        eventName: 'upload'
      },
      {
        label: 'Choose Files',
        icon: 'fa fa-file-archive-o',
        id: 'btn-upload-choosefiles',
        eventName: 'choosefiles'
      }
    ]
  };


  constructor(private route: ActivatedRoute, private router: Router,
    private oktaAuth: OktaAuthService, private changeDetector: ChangeDetectorRef) {
    const API = `${environment.INGESTION_API}`;
    const URL = API + '/api/v1/upload';
    this.authTokenValue = '';
    this.tokenString = '';
    this.token = '';

    this.getToken();
    this.authTokenValue = 'Bearer' + this.token;
    this.uploader = new FileUploader({
      url: URL,
      disableMultipart: false,
      autoUpload: false,
      isHTML5: true,
      authToken: this.authTokenValue

    });
    this.uploader.onProgressItem = (fileItem: any, progress: any) => {
      fileItem.progress = progress;
      this.onSearchChange(fileItem);
      this.changeDetector.detectChanges();
    };
  }


  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
    this.onSearchChange('');
  }
  public getToken() {
    this.oktaAuth.getAccessToken().then(data => {
      this.token = data;
      const authTokenValue = 'Bearer ' + this.token;
      this.uploader.authToken = authTokenValue;
    });
  }
  ngOnInit() {
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.onSearchChange('');
    };

    this.uploader.onBeforeUploadItem = (item: any) => {
      this.onSearchChange('');
    };
  }


  onSearchChange(item) {
    const obj = [];
    this.uploader.queue.forEach((uploadfileObj, i) => {
      let uploadStatus = '';
      let uploadresponseTxt = '';
      const action = false;
      if (uploadfileObj._xhr && uploadfileObj._xhr.responseText !== '') {
        const uploadtext = uploadfileObj._xhr.responseText.toString().split(':');
        uploadresponseTxt = uploadtext[2].toString().split(',')[0].split('"').join('');
      }
      if (uploadfileObj.isSuccess) {
        uploadStatus = 'Success';
      }
      if (uploadfileObj.isCancel) {
        uploadStatus = 'Cancel';
      }
      if (uploadfileObj.isUploading) {
        uploadStatus = 'Uploading';
      }
      if (uploadfileObj.isError) {
        uploadStatus = 'Error';
      }
      if (item === '' || (item !== '' && item !== uploadfileObj._file.name)) {
        obj.push({
          fileName: uploadfileObj._file.name,
          fileSize: uploadfileObj._file.size,
          fileProgress: uploadfileObj.progress,
          fileStatus: uploadStatus,
          fileReady: action,
          fileEvents: uploadfileObj,
          responseVal: uploadresponseTxt
        });
      }
    });
    this.dataSource = obj;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getEvent(params) {
    if (params.moduleName === 'upload') {
      if (params.eventName === 'upload') {
        this.uploader.uploadAll();
        this.onSearchChange('');
      } else if (params.eventName === 'cancel') {
        this.uploader.cancelAll();
      } else if (params.eventName === 'delete') {
        this.uploader.clearQueue();
        this.dataSource = [];
      } else {
        const el: HTMLElement = this.uploaderinput.nativeElement as HTMLElement;
        el.click();
      }
    }
  }
  clearData(item) {
    this.onSearchChange(item);
  }

}
