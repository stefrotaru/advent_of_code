// See https://aka.ms/new-console-template for more information
Console.WriteLine("Hello, World!");

int positionPartOne = 50;
int answerPartOne = 0;

int positionPartTwo = 50;
int answerPartTwo = 0;

// Read all lines from the input file, store an array of strings in listOfMoves
var listOfMoves = File.ReadAllLines("input.txt");

foreach (string move in listOfMoves)
{
    var moveDir = move[0];
    var moveValue = int.Parse(move.Substring(1));

    if (moveDir == 'L') {
        positionPartOne = (positionPartOne - moveValue + 100) % 100;
    } else {
        positionPartOne = (positionPartOne + moveValue) % 100;
    }

    if (positionPartOne == 0) {
        answerPartOne++;
    }
}
Console.WriteLine($"AnswerPartOne: {answerPartOne}");

foreach (string move in listOfMoves)
{
    var moveDir = move[0];
    var moveValue = int.Parse(move.Substring(1));

    for (int i = 1; i <= moveValue; i++)
    {
        if (moveDir == 'L') {
            positionPartTwo = (positionPartTwo - 1 + 100) % 100;
        } else {
            positionPartTwo = (positionPartTwo + 1) % 100;
        }

        if (positionPartTwo == 0) {
            answerPartTwo++;
        }
    }
}
Console.WriteLine($"AnswerPartTwo: {answerPartTwo}");