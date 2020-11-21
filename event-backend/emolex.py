from nltk import word_tokenize, sent_tokenize
from collections import defaultdict
import os
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

