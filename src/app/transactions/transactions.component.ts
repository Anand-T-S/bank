import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  transactions: any
  accno: any

  constructor(private ds:DataService) { 
    this.accno = this.ds.currentAccno
    this.transactions = this.ds.getTransactions(this.accno)
    console.log(this.transactions);
    
  }

  ngOnInit(): void {
  }

}
