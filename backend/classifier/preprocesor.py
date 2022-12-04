import numpy as np
import pandas as pd
import re
import contractions

class DataProcessor:
    def __init__(self, file_path):
        self.file_path = file_path

    # def save_file(self, data, filename):
    #     df = pd.DataFrame(data)
    #     df.to_pickle(filename)

    def load_data(self):
        '''
        This function loads the data into a data frame
        '''
        data = pd.read_csv(self.file_path, sep='\t')
        # Axis=0 for rows and Axis=1 for columns
        data = data.drop(data.columns[9:], axis=1) # Optimise this later to select only 9 columns from .tsv
        print(f'The shape of the data is {data.shape}')
        # print(data.loc[27:28,'tweet_id':'meddra_term'])
        return data

    def clean_data(self, data):
        '''
        This function cleans the noisy data from tweet column
        '''
        ## Use below for loop to get data with all special characters removed
        ## Cleaning special characters
        # for i in range(data.shape[0]):
        #     data.iat[i,6] = self.clean_spl_char(data.iat[i,6])
        # return data

        for i in range(data.shape[0]):
            ##Cleaning emoji
            data.iat[i,2] = self.clean_emoji(data.iat[i,2])
            ##Cleaning urls
            data.iat[i,2] = self.clean_url(data.iat[i,2])
            ##Perform Contractions 
            data.iat[i,2] = self.contractions(data.iat[i,2])
        return data 

    def clean_spl_char(self,tweet):
        '''
        Helper for clean_data function all special characters removed
        '''
        # Converting to lower case
        lower_text = tweet.lower()
        # Removing special characters
        wo_splchar = re.sub(r"[^a-z0-9]"," ",lower_text)
        # Removing whitespaces
        wo_whitespaces = " ".join(wo_splchar.split())
        return wo_whitespaces


    def ADR_data(self, data):
        '''
        This function returns only the data with type = ADR
        '''
        # Keeps only the rows with type = ADR 
        ADR_data = data.loc[lambda df: df['type']=='ADR',:]  
        print('ADR Data Below') ##Columns: [tweet_id, begin, end, type, extraction, drug, tweet, meddra_code, meddra_term]
        print(ADR_data)
        return ADR_data

    def clean_emoji(self, tweet):
        '''
        This function cleans the emojis from the tweet text
        '''
        all_emoticons = [':/',':l',':-)','-.-',':::---))))','&lt;',":'(",'-_-',':)','xx','xxx',';-)',':(',':-/',':)', ';)', ':o)', ':]', ':3', ':c)', ':>', '=]', '8)', '=)', ':}',
            ':^)', ':-D', ':D', '8-D', '8D', 'x-D', 'xD', 'X-D', 'XD', '=-D', '=D','d:',':-l','&lt;3',
            '=-3', '=3', ':-))', ":'-)", ":')", ':*', ':^*', '>:P', ':-P', ':P', 'X-P',':|','o_o',';)',
            'x-p', 'xp', 'XP', ':-p', ':p', '=p', ':-b', ':b', '>:)', '>;)', '>:-)',':-0','-__-',':(((',
            '<3'':L', ':-/', '>:/', ':S', '>:[', ':@', ':-(', ':[', ':-||', '=L', ':<',
            ':-[', ':-<', '=/', '>:(', ':(', '>.<', ":'-(", ":'(",  ':-c',
            ':c', ':{',  ';(', "=\\", ">:\\", ':\\']
        
        a = tweet
        for i in all_emoticons:
            a = a.replace(i,'')
            a = self.remove_emojis(a)
            a = " ".join(a.split())
        return a

    def remove_emojis(self, data):
        emoj = re.compile("["
            u"\U0001F600-\U0001F64F"  # emoticons
            u"\U0001F300-\U0001F5FF"  # symbols & pictographs
            u"\U0001F680-\U0001F6FF"  # transport & map symbols
            u"\U0001F1E0-\U0001F1FF"  # flags (iOS)
            u"\U00002500-\U00002BEF"  # chinese char
            u"\U00002702-\U000027B0"
            u"\U00002702-\U000027B0"
            u"\U000024C2-\U0001F251"
            u"\U0001f926-\U0001f937"
            u"\U00010000-\U0010ffff"
            u"\u2640-\u2642" 
            u"\u2600-\u2B55"
            u"\u200d"
            u"\u23cf"
            u"\u23e9"
            u"\u231a"
            u"\ufe0f"  # dingbats
            u"\u3030"
                        "]+", re.UNICODE)
        return re.sub(emoj, '', data)

    def clean_url(self, data):
        '''
        This function cleans the urls, hash and @username from the tweet text
        '''
        regex_url = r"(http[^\s]+)"
        wo_url = re.sub(regex_url,"",data)
        wo_url = re.sub(r"#","",wo_url)
        # wo_url = re.sub(r"(@[^\s]+)","",wo_url)
        wo_url = re.sub(r"(@[^\s]+)","@USER_",wo_url)
        # print(wo_url)
        return(wo_url)    
        
    def contractions(self, tweet):
        contracted_tweet = contractions.fix(tweet)
        return contracted_tweet
    
    def run_it(self):
        data = self.load_data()
        clean_data = self.clean_data(data)
        return clean_data

if __name__=='__main__':
    ## Passing data path to the data processor ##
    dp = DataProcessor('./Task 1/task2_en_training.tsv')
    data = dp.load_data()
    print(data)
    clean_data = dp.clean_data(data)
    print(clean_data)