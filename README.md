# ngx-resizer

Angular Directive to make elements resizeable.

Live Demo : https://mraghuram3.github.io/#/ngx-resizer

## Installation

To install this library, run:

```bash
$ npm install ngx-resizer --save
```

## Usage

Import `NgxResizeModule` in the root module

```ts
import { NgxResizeModule } from 'ngx-resizer';

@NgModule({
  imports: [
    // ...
    NgxResizeModule.forRoot(),
    ...
  ]
})
```

In your template

```html
  <div ngxResize [resizeId]="'test1'"  class="resizeable" [width]="width" [height]="height" [left]="left" [top]="top">
    test
    <div ngxResizeRight [resizeId]="'test1'" ></div>
    <div ngxResizeLeft [resizeId]="'test1'" ></div>
    <div ngxResizeTop [resizeId]="'test1'" ></div>
    <div ngxResizeBottom [resizeId]="'test1'" ></div>
  </div>
```
- **ngxResize**

    Add the directive to the div or other dom elemnts which is to be made into resizeable.

- **ngxResizeRight**

    To enable resizeable on right side of the element.

- **ngxResizeLeft**

    To enable resizeable on left side of the element.

- **ngxResizeTop**

    To enable resizeable on top side of the element.

- **ngxResizeBottom**

    To enable resizeable on bottom side of the element.

- **[resizeId]**: string

  Pass same id to the reiszeable elemnts and handels. 

- **[width]**: number

  To set the width of the element in pixels.

- **[height]**: number

  To set the height of the element in pixels. 

- **[top]**: number

  To set the top of the element in pixels.

- **[left]**: number

  To set the left of the element in pixels.

## License

MIT © [Raghu Ram M](mailto:mraghuram3@gmail.com)