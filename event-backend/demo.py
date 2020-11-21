import tweepy
import api
from fire import Fire


consumer_key = api.api_key
consumer_secret = api.api_key_secret
access_token = api.access_token
access_token_secret = api.access_token_secret


auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)

api = tweepy.API(auth)


def timeline():
    public_tweets = api.home_timeline()
    for tweet in public_tweets:
        print(tweet.text)


def dms():
    dms = api.list_direct_messages(count=10)
    return dms


def user(user):
    user = api.get_user(user)
    print(user.screen_name)
    print(user.followers_count)
    for friend in user.friends():
        print("user", friend.screen_name)


def main():
    # timeline()
    # Fire(user)
    # dms()


if __name__ == '__main__':
    main()
