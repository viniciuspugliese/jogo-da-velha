import {Component, inject, OnInit} from '@angular/core';
import {Game} from "../../shared/domain/game";
import {GameService} from "../../shared/services/game.service";

@Component({
    selector: 'app-welcome',
    standalone: true,
    templateUrl: './welcome.component.html'
})
export class WelcomeComponent implements OnInit {

    public game: Game = new Game();
    private gameService: GameService = inject(GameService);

    public ngOnInit(): void {
        this.gameService.getGame().subscribe(game => this.game = game);
    }

    public startWithIA(): void {
        this.gameService.startWithIA();
    }

    public startWithFriend(): void {
        this.gameService.startWithFriend();
    }
}
