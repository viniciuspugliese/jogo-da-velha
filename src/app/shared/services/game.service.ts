import {Injectable} from '@angular/core';
import {Game} from "../domain/game";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class GameService {

    private game: Game = new Game();
    private game$: BehaviorSubject<Game> = new BehaviorSubject<Game>(this.game);

    public getGame(): Observable<Game> {
        return this.game$.asObservable();
    }

    private emit(): void {
        this.game$.next(this.game);
    }

    public start(): void {
        this.game.started = true;
        this.emit();
    }

    public startWithFriend(): void {
        this.start();
        this.game.withFriend = true;
        this.emit();
    }

    public startWithIA(): void {
        this.start();
        this.game.withIA = true;
        this.emit();
    }

    public reset(): void {
        this.game = new Game();
        this.emit();
    }

    public new(): void {
        this.game.finished = null;
        this.game.userX = [];
        this.game.userO = [];
        this.game.count = null;

        this.game.lines = [
            [null, null, null],
            [null, null, null],
            [null, null, null],
        ];

        this.emit();
    }

    public select(line: any, column: any): void {
        if (this.game.finished || this.game.lines[line][column] || (this.game.withIA && this.game.user === 'O')) {
            return;
        }

        this.check(line, column);
    }

    private check(line: any, column: any): void {
        let index = (((line + 1) * 3) + (column + 1)) - 3;

        if (this.game.user === 'X') {
            this.game.userX.push(index);
        } else {
            this.game.userO.push(index);
        }

        this.game.lines[line][column] = this.game.user;

        this.handlerResult();
        this.changeUser();
        this.handlerWithIA();

        this.emit();
    }

    private handlerResult(): void {
        let count = 1;
        for (let item of this.game.possibleResults) {
            let resultX = this.game.userX.filter(a => item.includes(a));
            let resultO = this.game.userO.filter(a => item.includes(a));

            if (resultX.length === 3) {
                return this.win(count);
            }
            if (resultO.length === 3) {
                return this.win(count);
            }

            count++;
        }

        if ((this.game.userX.length + this.game.userO.length) === 9) {
            return this.draw();
        }
    }

    private handlerWithIA(): void {
        if (this.game.withFriend || this.game.user === 'X') {
            return;
        }

        for (let line of this.game.lines) {
            for (let column of line) {
                let simulation = this.game.userO;

                if (this.handlerParcialResult(simulation)) {

                }
            }
        }

        setTimeout(() => this.check(0, 0), 1000);
    }

    private handlerParcialResult(simulation: any[]): boolean {
        for (let item of this.game.possibleResults) {
            let resultO = simulation.filter(a => item.includes(a));

            if (resultO.length === 3) {
                return true;
            }
        }

        return false;
    }

    private changeUser(): void {
        if (this.game.user === 'X') {
            this.game.user = 'O';
        } else {
            this.game.user = 'X';
        }
    }

    private win(count: number): void {
        this.game.count = count;

        if (this.game.user === 'X') {
            this.game.wins += 1;
        } else {
            this.game.loss += 1;
        }

        this.game.finished = 'win';
    }

    private draw(): void {
        this.game.draw += 1;
        this.game.finished = 'draw';
    }
}
