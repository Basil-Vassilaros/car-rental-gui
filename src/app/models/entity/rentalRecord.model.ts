import { Car } from "./car.model";
import { Client } from "./client.model";

export class RentalRecord {
    rentalId?: number;
    dateReservationMade?: String;
    dateToCollect?: String;
    dateToReturn?: String;
    totalPrice?: number;
    car?: Car;
    client?: Client;
}
// @GeneratedValue(strategy = GenerationType.IDENTITY)
// @Column(updatable = false)
// private Long rentalId;

// @ManyToOne(fetch = FetchType.LAZY)
// @JoinColumn(name="carId", nullable = false, updatable = false)
// private Car car;

// @ManyToOne(fetch = FetchType.LAZY)
// @JoinColumn(name="clientId", nullable = false, updatable = false)
// private Client client;

// @Column(nullable = false, columnDefinition = "DATE")
// private LocalDate dateReservationMade;

// @Column(nullable = false, columnDefinition = "DATE")
// private LocalDate dateToCollect;

// @Column(nullable = false, columnDefinition = "DATE")
// private LocalDate dateToReturn;

// @Column(nullable = false)
// private Float totalPrice;