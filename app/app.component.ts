import {Component, OnInit} from '@angular/core';
import {HttpClient,HttpParams} from '@angular/common/http';

export interface GameResult{
    playerOneChoice:string,
    playerTwoChoice:string,
    result:string
}

export enum RESULT{
    PLAYER1, PLAYER2, TIE
}

export enum WEAPONS{
    ROCK, PAPER, SCISSORS
}

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
    constructor(private http: HttpClient) {
    }

    isComputerGame = false;

    ngOnInit() {
        this.isComputerGame = true;
        this.isReady = false;
    }

    RESULT = RESULT;
    WEAPONS = WEAPONS;

    baseUrl = 'http://localhost:8080/v1/games';

    scores = [0, 0];
    playerGesture = -1;
    loading = false;
    isReady = false;
    isResultShow = false;
    theResult = 0
    computerGesture  = -1;

    playerPlay(weapon: number): void {
        if(this.loading) {
            return;
        }
        this.loading = false;
        this.isResultShow = true;
        this.playerGesture = weapon;
        this.computerGesture = -1;
        this.calculatePlayerGameResult();
    }

    computerPlay(): void {
        if(this.loading) {
            return;
        }
        this.loading = false;
        this.isResultShow = true;
        this.calculateComputerGameResult();
    }

    reset(): void {
        this.scores = [0, 0];
    }

    calculatePlayerGameResult(): void {
        console.log(this.isComputerGame);
        let params = new HttpParams().set("playerGesture",WEAPONS[this.playerGesture]);

        this.http.get(this.baseUrl + "/player", {params:params}).subscribe((res:GameResult)=>{
            this.displayLogic(res);});
    }

    calculateComputerGameResult(): void {
        this.isComputerGame = true;
        console.log(this.isComputerGame);
        console.log(this.isResultShow);
        console.log(this.loading);

        this.http.get(this.baseUrl + "/computer").subscribe((res:GameResult)=>{
            this.playerGesture = WEAPONS[res.playerOneChoice];
            this.displayLogic(res);
        });
    }

    private displayLogic(res: GameResult) {
        this.computerGesture = WEAPONS[res.playerTwoChoice];
        this.theResult = RESULT[res.result];
        if (this.theResult == 0) {
            this.scores[0] = this.scores[0] + 1;
        } else if (this.theResult == 1) {
            this.scores[1] = this.scores[1] + 1;
        }
        console.log(res);
    }

    playerGame():void {
        this.isComputerGame = false;
        this.isReady = true;
        this.scores = [0,0];
        this.isResultShow = false;
    }

    computerGame():void {
        this.isComputerGame = true;
        this.isReady = true;
        this.scores = [0,0];
        this.isResultShow = false;
    }
}
