package main

import (
  "context"
  "encoding/json"
  "sort"
  "strings"
  "time"

  "github.com/aws/aws-lambda-go/events"
  "github.com/aws/aws-lambda-go/lambda"
)

type RequestBody struct {
  String string `json:"string"`
}

type ResponseBody struct {
  WordCount      int               `json:"wordCount"`
  LetterCount    int               `json:"letterCount"`
  SortedWords    []string          `json:"sortedWords"`
  SortedLetters  string            `json:"sortedLetters"`
  LetterCounts   map[string]int    `json:"letterCounts"` 
  ExecutionTime  float64           `json:"executionTime"`
}

func HandleRequest(ctx context.Context, request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
  startTime := time.Now()

  var body RequestBody
  err := json.Unmarshal([]byte(request.Body), &body)
  if err != nil {
    return events.APIGatewayProxyResponse{}, err
  }

  words := strings.Fields(body.String)
  letters := strings.Split(body.String, "") 
  letterCounts := make(map[string]int)
  for _, letter := range letters {
    letterCounts[letter]++
  }

  sort.Strings(words)
  sort.Strings(letters)

  responseBody := ResponseBody{
    WordCount:     len(words),
    LetterCount:   len(letters),
    SortedWords:   words,
    SortedLetters: strings.Join(letters, ""),
    LetterCounts:  letterCounts,
    ExecutionTime: float64(time.Since(startTime).Microseconds()) / 1000.0,
  }

  responseBodyJson, err := json.Marshal(responseBody)
  if err != nil {
    return events.APIGatewayProxyResponse{}, err
  }

  return events.APIGatewayProxyResponse{
    StatusCode: 200,
    Headers: map[string]string{
      "Access-Control-Allow-Origin":  "*",
      "Access-Control-Allow-Headers": "*",
    },
    Body: string(responseBodyJson),
  }, nil
}


func main() {
  lambda.Start(HandleRequest)
}