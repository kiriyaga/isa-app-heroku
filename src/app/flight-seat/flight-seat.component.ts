import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlightModule } from '../avio-company/flight/flight.module';
import { AvioCompanyService } from '../services/avio-company.service';
import { SeatModule } from '../avio-company/seat/seat.module';
import { OrderModule } from '../avio-company/order/order.module';

@Component({
    selector: 'app-flight-seat',
    templateUrl: './flight-seat.component.html',
    styleUrls: ['./flight-seat.component.css'],
    changeDetection: ChangeDetectionStrategy.Default
})
export class FlightSeatComponent implements OnInit {

    incrementRow: number = 1;
    flightId: number;
    flight: FlightModule;
    rows: Array<number> = [1];
    seats: Array<SeatModule>;
    total: number;
    pricePerSeat: number;
    additionalPrice: number;
    numberOfSeats: number;
    selected: Array<SeatModule> = new Array<SeatModule>();
    mode: String;
    landing:Date;

    constructor(private route: ActivatedRoute, private router: Router, private avioService: AvioCompanyService) { }

    ngOnInit() {
        this.flightId = +this.route.snapshot.paramMap.get('id');
        this.mode = this.route.snapshot.paramMap.get('mode');
        if(this.route.snapshot.paramMap.get('landing')!='None'){
            this.landing = new Date(this.route.snapshot.paramMap.get('landing'));
        }
        
        alert(this.mode);
        if (this.mode != 'rt' && this.mode != 'ow') {
            this.router.navigate(['/avio']);
        }

        this.avioService.getFlight(this.flightId).subscribe(

            data => {
                this.flight = data;
                this.seats = this.flight.seats;
                for (let index = 0; index < this.seats.length; index++) {
                    if ((index + 1) % 20 == 0) {
                        this.rows.push(this.incrementRow++);
                    }

                }
            },
            error => {
                this.router.navigate(['/avio']);
            }
        )

    }
    //return status of each seat
    getStatus(seat: SeatModule, row, col) {
        seat.seatCode = row + '-' + col;
        if (seat.seatType == 'AVAILABLE') {
            return 'free';
        } else if (seat.seatType == 'RESERVED') {
            return 'reserved';
        }
        else if (seat.seatType == 'FASTRESERVE') {
            return 'fast';
        }
        else if (seat.seatType == 'NOTACTIVE') {
            return 'notactive';
        }
        return "selected";
    }

    //clear handler
    clearSelected = function () {
        for (let index = 0; index < this.selected.length; index++) {
            var index1 = this.seats.indexOf(this.selected[index]);
            if (index1 !== -1) {
                this.selected[index].seatType = 'AVAILABLE';
                this.seats[index1] = this.selected[index];
            }
        }
        this.selected = [];
    }
    //click handler
    seatClicked(seat: SeatModule) {
        var index1 = this.selected.indexOf(seat);
        var index = this.seats.indexOf(seat);
        if (index1 !== -1) {
            // seat already selected, remove
            var selectedT: Array<SeatModule> = new Array<SeatModule>();
            for (let index2 = 0; index2 < this.selected.length; index2++) {
                if (index2 != index1) {
                    selectedT.push(this.selected[index2]);
                }
            }
            this.selected = selectedT;
            seat.seatType = 'AVAILABLE';
            this.seats[index] = seat;


        } else {
            //push to selected array only if it is not reserved
            if (seat.seatType != 'RESERVED' && seat.seatType != 'FASTRESERVE' && seat.seatType != 'NOTACTIVE') {
                seat.seatType = 'SELECTED';
                this.selected.push(seat);
                this.seats[index] = seat;

            }
        }
        this.refreshPrice();
    }

    refreshPrice() {

        this.pricePerSeat = this.flight.priceForTicket;
        this.additionalPrice = 0;
        this.selected.forEach(item => {
            this.additionalPrice += item.additionalPriceForClass;
        });
        this.total = this.pricePerSeat * this.selected.length + this.additionalPrice;

    }
    //Buy button handler
    public showSelected() {
        if (this.selected.length > 0) {
            var order = new OrderModule();
            order.flight = this.flight;
            order.mode = this.mode;
            if(this.landing == null){
                order.landing = new Date();
            }
            else { order.landing = this.landing;}
            order.seats = this.selected;
            localStorage.setItem('order', JSON.stringify(order));
            if (JSON.parse(localStorage.getItem('sessionUser')) != null) {
                this.router.navigate(['/avio/friends']);
            }
            else {
                this.router.navigate(['/avio/passengers']);
            }
        }
    }
}
