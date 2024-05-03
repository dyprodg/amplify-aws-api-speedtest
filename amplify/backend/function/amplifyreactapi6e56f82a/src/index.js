/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    const startTime = process.hrtime();
    const body = JSON.parse(event.body);
    const str = body.string;

    const words = str.split(/\s+/);
    const letters = str.split('');

    const wordCount = words.length;
    const letterCount = letters.length;

    words.sort()
    letters.sort();

    const letterCounts = letters.reduce((acc, letter) => {
        acc[letter] = (acc[letter] || 0) + 1;
        return acc;
    }, {});

    const hrTime = process.hrtime(startTime);
    const executionTime = hrTime[0] * 1000 + hrTime[1] / 1e6;

    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*"
        },
        body: JSON.stringify({
            wordCount,
            letterCount,
            sortedWords: words,
            sortedLetters: letters.join(''),
            letterCounts,
            executionTime
        }),
    };
};