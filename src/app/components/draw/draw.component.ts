import {Component, inject, OnInit} from '@angular/core';
import {Game} from "../../shared/domain/game";
import {GameService} from "../../shared/services/game.service";

@Component({
    selector: 'app-draw',
    standalone: true,
    templateUrl: './draw.component.html'
})
export class DrawComponent implements OnInit {

    public game: Game = new Game();
    private gameService: GameService = inject(GameService);

    public ngOnInit(): void {
        this.gameService.getGame().subscribe(game => this.game = game);
    }

    public new(): void {
        this.gameService.new();
    }
}
