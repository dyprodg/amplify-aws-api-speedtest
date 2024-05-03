import json
import time
from collections import Counter

def handler(event, context):
    start_time = time.time()

    body = json.loads(event['body'])
    str_input = body['string']

    words = str_input.split()
    letters = list(str_input)  # Entferne das Ersetzen oder Filtern

    word_count = len(words)
    letter_count = len(letters)

    words.sort()
    letters.sort()

    letter_counts = dict(Counter(letters))

    result = {
        'wordCount': word_count,
        'letterCount': letter_count,
        'sortedWords': words,
        'sortedLetters': ''.join(letters),
        'letterCounts': letter_counts
    }

    execution_time = (time.time() - start_time) * 1000

    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*'
        },
        'body': json.dumps({
            'wordCount': word_count,
            'letterCount': letter_count,
            'sortedWords': words,
            'sortedLetters': ''.join(letters),
            'letterCounts': letter_counts,
            'executionTime': execution_time
        }),
    }
