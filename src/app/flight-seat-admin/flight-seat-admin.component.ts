import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlightModule } from '../avio-company/flight/flight.module';
import { AvioCompanyService } from '../services/avio-company.service';
import { SeatModule, SeatTypeEnum, SeatClassEnum } from '../avio-company/seat/seat.module';
import { FormGroup, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';


@Component({
    selector: 'app-flight-seat-admin',
    templateUrl: './flight-seat-admin.component.html',
    styleUrls: ['./flight-seat-admin.component.css']
})
export class FlightSeatAdminComponent implements OnInit {

    incrementRow: number = 1;
    flightId: number;
    flight: FlightModule;
    rows: Array<number> = [1];
    seats: Array<SeatModule>;

    selectedSeat: SeatModule;

    seatForm = new FormGroup({
        seattype: new FormControl(''),
        seatclass: new FormControl(''),
        discount: new FormControl('',[Validators.max(100),Validators.min(0)]),
        addprice: new FormControl('', Validators.required)
    });

    constructor(private route: ActivatedRoute, private router: Router, private avioService: AvioCompanyService) {

    }

    public AddSeat() {
        var seat = new SeatModule();
        seat.seatClass = 'ECONOMIC'
        seat.seatType = 'AVAILABLE'
        seat.additionalPriceForClass = 0
        this.seats.push(seat);
        if (this.seats.length % 20 == 0) {
            this.rows.push(this.incrementRow++);
        }
    }

    public SaveSeats() {

        this.seats.forEach(el => {
            alert(el.id);
            
        });
        this.avioService.saveSeats(this.seats, this.flight.id).subscribe(

            data => {
                this.flight = data;
                this.seats = this.flight.seats;


            },
            error => {
                alert(error);
                this.router.navigate(['/avio']);
            }
        )

    }
    ngOnInit() {
        this.flightId = +this.route.snapshot.paramMap.get('id');

        this.avioService.getFlightFromUser(this.flightId).subscribe(

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
    getStatus(seat: SeatModule,row,col) {
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
        return null;
    }

    public SaveSeat() {
    if(this.selectedSeat.seatType!='RESERVED'){
        var index = this.seats.indexOf(this.selectedSeat);
        if (index !== -1) {
            var seat = new SeatModule();
            if(this.seats[index].id!=null){
                seat.id=this.seats[index].id;
            }
            seat.seatType = this.seatForm.get('seattype').value;
            seat.seatClass = this.seatForm.get('seatclass').value;
            seat.additionalPriceForClass = this.seatForm.get('addprice').value;
            seat.discount = this.seatForm.get('discount').value;
            this.seats[index] = seat;
        }
    }
    }

    seatClicked(seat: SeatModule, i, j) {
        this.selectedSeat = seat;
        this.seatForm.get('seattype').setValue(seat.seatType);
        this.seatForm.get('seatclass').setValue(seat.seatClass);
        this.seatForm.get('addprice').setValue(seat.additionalPriceForClass);
        this.seatForm.get('discount').setValue(seat.discount);
    }

}

