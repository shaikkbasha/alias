export class DynamicFormBase<T> {
    value: T;
    key: string;
    id: string;
    label: string;
    required: boolean;
    order: number;
    controlType: string;
    pattern: string;
    constructor(options: {
        value?: T,
        key?: string,
        label?: string,
        required?: boolean,
        order?: number,
        controlType?: string,
        pattern?: string
      } = {}) {
      this.value = options.value;
      this.key = options.key || '';
      this.id = options['id'] || '';
      this.label = options.label || '';
      this.required = !!options.required;
      this.order = options.order === undefined ? 1 : options.order;
      this.controlType = options.controlType || '';
      this.pattern = options.pattern || '';
    }
  }
