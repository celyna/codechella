import time
import tweepy
import key
import os
import dataset
from flask import Flask
from flask import request
from flask import jsonify
from flask_cors import CORS
from nltk import word_tokenize, sent_tokenize
from collections import defaultdict
import json

app = Flask(__name__)
CORS(app)


consumer_key = key.api_key
consumer_secret = key.api_key_secret
access_token = key.access_token
access_token_secret = key.access_token_secret

auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)

api = tweepy.API(auth)
emolex_file = os.path.join('emolex.txt')


def read_emolex(filepath=None):
    '''
    Takes a file path to the emolex lexicon file.
    Returns a dictionary of emolex sentiment values.
    '''
    if filepath==None: # Try to find the emolex file
        filepath = os.path.join('emolex.txt')
        if os.path.isfile(filepath):
            pass
        elif os.path.isfile('emolex.txt'):
            filepath = 'emolex.txt'
        else:
            raise FileNotFoundError('No EmoLex file found')
    emolex = defaultdict(dict) # Like Counter(), defaultdict eases dictionary creation
    with open(filepath, 'r') as f:
    # emolex file format is: word emotion value
        for line in f:
            word, emotion, value = line.strip().split()
            emolex[word][emotion] = int(value)
    return emolex


def tokenize_text(text, stopwords=None):
    '''
    Takes a string.
    Returns a list of tokenized sentences.
    '''
    tokenized_text = []
    for sent in sent_tokenize(text):
        tokens = word_tokenize(sent)
        if stopwords != None:
            tokens = [token for token in tokens if token not in stopwords]
        tokenized_text.append(tokens)
    return tokenized_text


def sentiment_score(token_list, lexicon=None):
    output = {
        'anger': 0.0,
        'anticipation': 0.0,
        'disgust': 0.0,
        'fear': 0.0,
        'joy': 0.0,
        'negative': 0.0,
        'positive': 0.0,
        'sadness': 0.0,
        'surprise': 0.0,
        'trust': 0.0
    }
    emolex = read_emolex(emolex_file)
    for token in token_list[0]:
        if token.lower() in emolex:
            for emo in emolex[token.lower()]:
                if emolex[token.lower()].get(emo) == 1:
                    output.update({emo: emolex[token.lower()].get(emo) / len(token_list)})
    return output


def get_tweet(tweet):
    name = tweer.name
    screen_name = tweet.screen_name
    location = tweet.location
    text = tweet.text
    likes_count = tweet.favorite_count
    created_at = tweet.created_at
    coordinates = tweet.coordinates
    quote_count = tweet.quote_count
    reply_count = tweet.reply_count
    retweet_count = tweet.retweet_count
    token = tokenize_text(text)
    sentiment = sentiment_score(token)
    if coordinates is not None:
        coordinates = json.dumps(coordinates)
    with dataset.connect() as tx:
        tx['tweets'].update(
            dict(
                user_name=name,
                user_handle=screen_name,
                user_location=location,
                tweet_text=text,
                tweet_likes=likes_count,
                tweet_time=created_at,
                tweet_coords=coordinates,
                tweet_quote_count=quote_count,
                tweet_reply_count=reply_count,
                tweet_retweet_count=retweet_count,
            )
        )


class MyStreamListener(tweepy.StreamListener):

    def on_status(self, status):
        get_tweet(status)

    def on_error(self, status_code):
        if status_code == 420:
            return False


@app.route('/')
def index():
    myStreamListener = MyStreamListener()
    myStream = tweepy.Stream(auth=api.auth, listener=myStreamListener)
    myStream.filter(track=['twitter'])
    return jsonify(myStream)


@app.route('/time')
def get_current_time():
    return {'time': time.time()}


@app.route('/result', methods=['POST'])
def getEvent():
    # data = request.json
    myStreamListener = MyStreamListener()
    myStream = tweepy.Stream(auth=api.auth, listener=myStreamListener)
    # myStream.filter(track=[data.get('event')])
    myStream.filter(track=['python'])
    app.run(debug=True)

    return "OK"

# if __name__ == '__main__':
#     print("starting")
#     myStreamListener = MyStreamListener()
#     myStream = tweepy.Stream(auth=api.auth, listener=myStreamListener)
#     myStream.filter(track=['machine learning'])
#     app.run(debug=True)
    # print(read_emolex(emolex_file))
