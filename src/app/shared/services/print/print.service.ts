import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class PrintService {

    constructor() { }

    print(divName, header) {

        const stylesHtml = `
        <style>
         @page {
            size:auto;
            margin:5mm;
          }
           * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
                font-family: sans-serif;
            }
          .uppercase {
            text-transform: uppercase;
          }
          .btn-group .btn + .btn {
            margin-left: -1px;
          }
          h3 {
            display: block;
            margin-block-start: 1.33em;
            margin-block-end: 1.33em;
            margin-inline-start: 0px;
            margin-inline-end: 0px;
            font-weight: bold;
          }
          .text-center{
              text-align: center;
          }
          .label-group {
            width: 240px;
            height: 10px;
            font-size: 10px !important;
          }
          .label-primary {
            color: #5dbfd4 !important;
          }
          .col-4 {
            flex: 0 0 33.333333%;
            max-width: 33.333333%;
          }

          .label-secondary {
            color: #f0f0f0 !important;
          }

          .value-group {
            width: 240px;
            font-size: 13px;
            line-height: 1;
            margin-top: 9px;
          }
          p {
            display: block;
            margin-block-start: 1em;
            margin-block-end: 1em;
            margin-inline-start: 0px;
            margin-inline-end: 0px;
        }
        .form-group {
            margin-bottom: 1rem;
        }
        .row {
            display: flex;
            flex-wrap: wrap;
            margin-right: -15px;
            margin-left: -11px;
        }
        .col-sm-9 {
            flex: 0 0 75%;
            max-width: 75%;
            position: relative;
            width: 100%;
            min-height: 1px;
            padding-right: 15px;
            padding-left: 15px;
        }
        .btn-toolbar {
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
        }
        .removal-mod-dot .btn-toolbar .btn-group {
            width: 100%;
        }
        .mr-2, .mx-2 {
            margin-right: 0.5rem !important;
        }
        .btn-group, .btn-group-vertical {
            position: relative;
            display: inline-flex;
            vertical-align: middle;
        }
        .removal-mod-dot .btn-toolbar .btn-group label {
            width: 6% !important;
            text-align: center;
            padding: 8px 0px;
        }
        .btn-group {
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
        }
        .btn-group > .btn:first-child {
            margin-left: 0;
        }
        .btn-group-toggle > .btn, .btn-group-toggle > .btn-group > .btn {
            margin-bottom: 0;
        }
        .btn-group > .btn, .btn-group-vertical > .btn {
            position: relative;
            flex: 0 1 auto;
        }
        .btn-group > .btn:not(:last-child):not(.dropdown-toggle), .btn-group > .btn-group:not(:last-child) > .btn {
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
        }
        .mod-dot {
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
        }
        .col-sm-6 {
            flex: 0 0 50%;
            max-width: 50%;
        }
        .col-1, .col-2, .col-3, .col-4, .col-5, .col-6, .col-7, .col-8, .col-9,
        .col-10, .col-11, .col-12, .col, .col-auto, .col-sm-1, .col-sm-2, .col-sm-3,
        .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-10,
        .col-sm-11, .col-sm-12, .col-sm, .col-sm-auto, .col-md-1, .col-md-2,
        .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9,
        .col-md-10, .col-md-11, .col-md-12, .col-md, .col-md-auto, .col-lg-1,
        .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8,
        .col-lg-9, .col-lg-10, .col-lg-11, .col-lg-12, .col-lg, .col-lg-auto,
        .col-xl-1, .col-xl-2, .col-xl-3, .col-xl-4, .col-xl-5, .col-xl-6, .col-xl-7,
        .col-xl-8, .col-xl-9, .col-xl-10, .col-xl-11, .col-xl-12, .col-xl,
        .col-xl-auto {
            position: relative;
            width: 100%;
            min-height: 1px;
            padding-right: 15px;
            padding-left: 15px;
        }
        .btn-group .active-btn {
            color: #ffffff !important;
            background-color: #5dbfd4 !important;
        }
        .mt-2 {
            margin-top: 0.5rem !important;
        }
        .col-sm-12 {
            flex: 0 0 100%;
            max-width: 100%;
            position: relative;
            width: 100%;
            min-height: 1px;
            padding-right: 15px;
            padding-left: 15px;
        }

        .btn-group label {
            border-color: #253746 !important;
            background-color: #f0f0f0 !important;
        }
        .btn-outline-secondary {
            background-image: none;
        }
        .btn {
            display: inline-block;
            font-weight: 400;
            white-space: nowrap;
            vertical-align: middle;
            user-select: none;
            border: 1px solid transparent;
            line-height: 1.5;
            border-radius: 0.25rem;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
        }
        .content-dark {
            color: #253746 !important;
        }
        .form-control {
            font-size: 13px !important;
            height: calc(2.25rem + 2px);
            background-clip: padding-box;
        }
        .btn-group-toggle > .btn input[type="checkbox"] {
            position: absolute;
            clip: rect(0, 0, 0, 0);
            pointer-events: none;
        }
        input[type="radio"], input[type="checkbox"] {
            box-sizing: border-box;
            padding: 0;
        }
        input {
            outline: none;
        }
        input, button, select, optgroup, textarea {
            margin: 0;
            font-family: inherit;
            font-size: inherit;
            line-height: inherit;
        }
        label {
            display: inline-block;
            margin-bottom: 0.5rem;
            outline: none !important;
            -webkit-box-shadow: none !important;
        }
        label {
            font-size: 10px !important;
            color: #5b606e !important;
        }
        .col-3 {
            flex: 0 0 25%;
            max-width: 25%;
            position: relative;
            width: 100%;
            min-height: 1px;
            padding-right: 15px;
            padding-left: 15px;
        }
            .app-title-section .section-title {
                font-size: 13px !important;
                font-weight: 700 !important;
                color: #253746;
                margin-bottom: 12px !important;
                box-sizing: border-box;
                font-family: sans-serif;
            }
            p {
                margin-top: 0;
                margin-bottom: 1rem;
            }

            .modal-content {
                position: relative;
                display: flex;
                flex-direction: column;
                width: 100%;
                pointer-events: auto;
                background-color: #fff;
                background-clip: padding-box;
                border: 1px solid rgba(0, 0, 0, 0.2);
                border-radius: 0.3rem;
                outline: 0;
            }

            .app-title-section {
                margin-bottom: 24px !important;
            }
            .mt-5, .my-5 {
                margin-top: 3rem !important;
            }
            .app-title-section hr {
                margin: 0 !important;
            }
            hr {
                border: 0;
                border-top: 1px solid rgba(0, 0, 0, 0.1);
            }

            hr {
                box-sizing: content-box;
                height: 0;
                overflow: visible;
                display: block;
                unicode-bidi: isolate;
                margin-block-start: 0.5em;
                margin-block-end: 0.5em;
                margin-inline-start: auto;
                margin-inline-end: auto;
            }

            .mt-5, .my-5 {
                margin-top: 3rem !important;
            }

            .app-title-section {
                margin-bottom: 24px !important;
            }
            </style>`;
        const headerName = header ? header : '';
        let printContents, popupWin;
        printContents = document.getElementById(divName) ? document.getElementById(divName).innerHTML : '';
        popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
        popupWin.document.open();
        popupWin.document.write(`
      <html>
          <head>
              <title>${headerName}</title>
              <h3 class="text-center uppercase">${headerName}</h3>
          </head>
         ${stylesHtml}
          <body onload="window.print(); window.close()">
              ${printContents}
          </body>
      </html>
      `
        );
        popupWin.document.close();
    }

}
