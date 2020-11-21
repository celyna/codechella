<<<<<<< HEAD:event-backend/app.py
from flask import Flask
import tweepy
import os
from collections import defaultdict
=======
>>>>>>> feature/connectBackend:event-backend/emolex.py
from nltk import word_tokenize, sent_tokenize
from collections import defaultdict
import os
import tweepy
import json
import key
import dataset

<<<<<<< HEAD:event-backend/app.py

app = Flask(__name__)
app.secret_key = 'my secret key'
app.config.from_pyfile('config.py')

consumer_key = app.config['API_KEY']
consumer_secret = app.config['API_SECRET_KEY']
access_token = app.config['ACCESS_TOKEN']
access_token_secret = app.config['ACCESS_TOKEN_SECRET']
=======
consumer_key = key.api_key
consumer_secret = key.api_key_secret
access_token = key.access_token
access_token_secret = key.access_token_secret
>>>>>>> feature/connectBackend:event-backend/emolex.py

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


<<<<<<< HEAD:event-backend/app.py
class MyStreamListener(tweepy.StreamListener):

    def on_status(self, status):
        print(status.text)


def get_tweets():
    myStreamListener = MyStreamListener()
    myStream = tweepy.Stream(auth=api.auth, listener=myStreamListener)
    myStream.filter(track=['machine learning'])
    return myStream


@app.route('/')
def index():
    return get_tweets()
=======
def get_tweet(tweet):
    name = tweet.user.name
    screen_name = tweet.user.screen_name
    location = tweet.user.location
    text = tweet.text
    likes_count = tweet.favorite_count
    created_at = tweet.created_at
    coordinates = tweet.coordinates
    quote_count = tweet.quote_count
    reply_count = tweet.reply_count
    retweet_count = tweet.retweet_count
    token = tokenize_text(text)
    sentiment = sentiment_score(token)
    db = dataset.connect("sqlite:///tweets.db")
    if coordinates is not None:
        coordinates = json.dumps(coordinates)
    table = db["tweets"]
    table.insert(
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
                tweet_sentiment=sentiment
            )
        )


class MyStreamListener(tweepy.StreamListener):

    def on_status(self, status):
        get_tweet(status)

    def on_error(self, status_code):
        if status_code == 420:
            return False


def main():
    myStreamListener = MyStreamListener()
    myStream = tweepy.Stream(auth=api.auth, listener=myStreamListener)
    myStream.filter(track=['twitter'], is_async=True)


if __name__ == '__main__':
    main()
>>>>>>> feature/connectBackend:event-backend/emolex.py