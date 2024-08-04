export class Game {

    public started: boolean = false;
    public withFriend: boolean = false;
    public withIA: boolean = false;
    public finished: null | 'win' | 'draw' = null;

    public user: 'X' | 'O' = 'X';
    public count: any = null;

    public wins: number = 0;
    public loss: number = 0;
    public draw: number = 0;

    public userX: any[] = [];
    public userO: any[] = [];

    public lines: any[] = [
        [null, null, null],
        [null, null, null],
        [null, null, null],
    ];

    public possibleResults: any[] = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],

        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],

        [1, 5, 9],
        [3, 5, 7]
    ];
}
