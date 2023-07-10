import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, of, take } from 'rxjs';
import { AddressService } from '../services/address.service';
import { GetShortUrlByIdResponseModel } from '../services/response-models/GetShortUrlByIdResponseModel';

@Component({
    selector: 'app-redirect',
    templateUrl: './redirect.component.html',
    styleUrls: ['./redirect.component.css'],
})
export class RedirectComponent implements OnInit {
    public originalUrl = '';
    public error!: HttpErrorResponse;

    constructor(
        private addressService: AddressService,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.route.params.pipe(take(1)).subscribe((data) => {
            this.getAddress(data['id']);
        });
    }

    private getAddress(id: string) {
        this.addressService
            .searchUrl(id)
            .pipe(
                catchError((e) => {
                    this.error = e;

                    return of(e);
                }),
                take(1)
            )
            .subscribe((data: GetShortUrlByIdResponseModel) => {
                if (!data?.data) {
                    return;
                }

                this.redirect(data.data.original_address);
            });
    }

    private async redirect(data: string) {
        await new Promise((r) => setInterval(r, 1000));

        this.originalUrl = data;
        setTimeout(() => {
            window.location.href = data;
        }, 1500);
    }
}
