import { Component, OnDestroy, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { Subscription, take } from 'rxjs';
import { AddressService } from '../services/address.service';
import { CreateShortUrlResponseModel } from '../services/response-models/CreateShortUrlResponseModel';
import { GetShortUrlByIdResponseModel } from '../services/response-models/GetShortUrlByIdResponseModel';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
    public form!: FormGroup;
    public recievedUrl = '';

    private valueChanges$!: Subscription;

    constructor(
        private addressService: AddressService,
        private fb: FormBuilder
    ) {}

    public ngOnInit(): void {
        this.form = this.fb.group({
            url: new FormControl('', [Validators.required]),
        });

        this.valueChanges$ = this.form.valueChanges.subscribe(({ url }) => {
            this.createUrl(url as string);
        });
    }

    public ngOnDestroy(): void {
        this.valueChanges$.unsubscribe();
    }

    public copyToclipBoard(): void {
        navigator.clipboard.writeText(this.recievedUrl);
        this.recievedUrl = 'Copied to clipboard!';
    }

    private createUrl(url: string): void {
        try {
            const validUrl = new URL(url);

            this.addressService
                .createUrl(validUrl.toString())
                .pipe(take(1))
                .subscribe((data: CreateShortUrlResponseModel) => {
                    this.getAddress(data.data.id);
                });
        } catch (error) {
            this.recievedUrl = 'Entered url is not valid';
            return;
        }
    }

    private getAddress(id: string): void {
        this.addressService
            .getUrlById(id)
            .pipe(take(1))
            .subscribe((data: GetShortUrlByIdResponseModel) => {
                this.recievedUrl = `http://localhost:4200/r/${data.data.short_address}`;
            });
    }
}
