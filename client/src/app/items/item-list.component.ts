import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, takeUntil } from 'rxjs';
import { Item, FoodCategory } from './item';
import { ItemService } from './item.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
  providers: []
})
export class ItemListComponent implements OnInit, OnDestroy{

  public serverFilteredItems: Item[];
  public filteredItems: Item[];

  public itemName: string;
  public itemCategory: FoodCategory;
  public itemUnit: string;
  public itemCount: number;
  public itemPrice: number;
  public itemPriority: number;

  private ngUnsubscribe = new Subject<void>();

  constructor(private itemService: ItemService, private snackBar: MatSnackBar) {
    // Nothing here – everything is in the injection parameters.
  }
  getItemsFromServer(): void {

    this.itemService.getItems({
      category: this.itemCategory,
      count: this.itemCount
    }).pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe({

      next: (returnedItems) => {

        this.serverFilteredItems = returnedItems;

        //this.updateFilter();
      },

      error: (err) => {
        let message = '';
        if (err.error instanceof ErrorEvent) {
          message = `Problem in the client – Error: ${err.error.message}`;
        } else {
          message = `Problem contacting the server – Error Code: ${err.status}\nMessage: ${err.message}`;
        }
        this.snackBar.open(
          message,
          'OK',

          { duration: 6000 });
      },

    });
  }

  ngOnInit(): void {
    this.getItemsFromServer();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
