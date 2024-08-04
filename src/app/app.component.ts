import {Component, inject, OnInit} from '@angular/core';
import {NgClass} from "@angular/common";
import {Game} from "./shared/domain/game";
import {GameService} from "./shared/services/game.service";
import {WinComponent} from "./components/win/win.component";
import {DrawComponent} from "./components/draw/draw.component";
import {WelcomeComponent} from "./components/welcome/welcome.component";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        NgClass,
        WinComponent,
        DrawComponent,
        WelcomeComponent
    ],
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    public game: Game = new Game();
    private gameService: GameService = inject(GameService);

    public ngOnInit(): void {
        this.gameService.getGame().subscribe(game => this.game = game);
    }

    public new(): void {
        this.gameService.new();
    }

    public reset(): void {
        this.gameService.reset();
    }

    public select(line: any, column: any): void {
        this.gameService.select(line, column);
    }
}
