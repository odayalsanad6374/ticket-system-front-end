import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, ContentChild, ElementRef, EventEmitter, inject, Input, OnDestroy, Output, Renderer2, TemplateRef, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TooltipModule } from 'primeng/tooltip';
import { v4 as uuid4 } from 'uuid';
declare const bootstrap: { Modal: new (arg0: HTMLElement, arg1: { focus: boolean; }) => any; };

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, TooltipModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent implements AfterViewInit, OnDestroy {
  private cdr = inject(ChangeDetectorRef);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private renderer = inject(Renderer2);
  @Input() header = ''; // HEADER TEXT
  @Input() headerColor = 'initial'; // HEADER TEXT COLOR
  @Input() alwaysRender = false; // IF TRUE THE BODY ALWAYS RENDER EVEN THE MODAL IS CLOSED
  @Input() staticBackdrop = false; // MODAL DISMISS IF THE USER CLICK ON BACKDROP
  @Input() showCloseButton = false; // SHOW CLOSE BTN ON HEADER
  @Input() size: 'modal-sm' | 'modal-lg' | 'modal-xl' | 'modal-md' = 'modal-md'; // MODAL SIZE
  @Input() mode: 'modal-fullscreen' | 'modal-fullscreen-sm-down' | 'modal-fullscreen-md-down' | 'modal-fullscreen-lg-down' | 'modal-fullscreen-xl-down' | 'modal-fullscreen-xxl-down' | '' = ''; // IF HEADER IS FULL SCREEN MODE
  @Input() scrollable = false;
  @Input() styleClass = "";
  @Input() appendToBody = false; 

  @Input() backTo = '';
  @Input() params: Params | undefined;

  @Input() component!: Type<any>;
  @Input() data: any;
  @Input() showHeader = false;

  @ContentChild('mBody', { static: true }) modalBody!: TemplateRef<unknown>;
  @ContentChild('mFooter', { static: true }) modalFooter!: TemplateRef<unknown>;
  showTemplate = false;

  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onModalInit = new EventEmitter<ModalComponent>();
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onClose = new EventEmitter<void>();
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onShow = new EventEmitter<void>();

  @ViewChild('contentContainer', { static: false, read: ViewContainerRef }) contentContainer!: ViewContainerRef;
  @ViewChild('modelWoComponent') modelWoComponent!: ElementRef<HTMLElement>;
  @ViewChild('modelWComponent') modelWComponent!: ElementRef<HTMLElement>;
  @ContentChild("modalHeader", { static: true }) modalHeader!: TemplateRef<unknown>;

  id: string;
  private modalElement: HTMLElement | null = null;
  modalObject: any;

  constructor() {
    this.id = uuid4();
  }

ngAfterViewInit() {
    this.modalElement = this.modelWoComponent?.nativeElement || this.modelWComponent?.nativeElement;
    
    if (this.modalElement) {
      if (this.appendToBody) {
        this.appendModalToBody();
      }
      
      this.modalObject = new bootstrap.Modal(this.modalElement, {focus: false});
      this.modalElement.addEventListener('show.bs.modal', this.onShowEvent.bind(this));
      this.modalElement.addEventListener('hidden.bs.modal', this.onHideEvent.bind(this));
    }
  }
   appendModalToBody(){
     if (this.modalElement && this.appendToBody) {
       this.renderer.appendChild(document.body, this.modalElement);
     }
   }
onShowEvent() {
    this.showTemplate= true;
    this.onShow.emit();
    this.cdr.detectChanges();
  }
  onHideEvent(event: any){
    if((<HTMLElement>event.target).id == this.id){
      this.showTemplate= false;
      this.onClose.emit();
    }
  }

  show() {
    this.modalObject?.show();
    if(this.component){
      const comp = this.contentContainer?.createComponent(this.component);
      comp.instance.data = this.data;
      if(comp.instance.modal !== 'undefined')
        comp.instance.modal = this;
      this.cdr.detectChanges();
    }
  }

  hide() {
    this.modalObject?.hide();
  }
  close() {
    if (this.backTo){
      this.router.navigate(['../' + this.backTo], { relativeTo: this.route,  queryParams: this.params });
    }
    this.modalObject?.hide();
  }

 ngOnDestroy(): void {
    if (this.modalElement) {
      this.modalElement.removeEventListener('shown.bs.modal', this.onShowEvent.bind(this));
      this.modalElement.removeEventListener('hidden.bs.modal', this.onHideEvent.bind(this));
    }
    
    if (this.appendToBody) {
      this.renderer.removeChild(document.body, this.modalElement);
    }

    if (this.modalObject) {
      this.modalObject.dispose();
    }
  }
}
