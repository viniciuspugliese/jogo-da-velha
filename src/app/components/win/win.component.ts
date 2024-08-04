import {Component, inject, OnInit} from '@angular/core';
import {Game} from "../../shared/domain/game";
import {GameService} from "../../shared/services/game.service";

@Component({
    selector: 'app-win',
    standalone: true,
    templateUrl: './win.component.html'
})
export class WinComponent implements OnInit {

    public game: Game = new Game();
    private gameService: GameService = inject(GameService);

    public ngOnInit(): void {
        this.gameService.getGame().subscribe(game => this.game = game);
    }

    public new(): void {
        this.gameService.new();
    }
}
