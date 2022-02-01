import os
from configparser import SafeConfigParser,ConfigParser


def get_config_value(module, variable):
    _curr_path = os.getcwd()    
    _config_path = os.path.join(_curr_path, 'app/config/config.ini')   
    _conf_value = None
    try:
        _parser = SafeConfigParser()      
        _parser.read(_config_path)      
        _conf_value = _parser.get(module, variable)
        
        #overrides api url with env var if found
        if module=="db_api" and variable=="db_host":
            temp = os.getenv('NFT_SPACE_API_URL')
            if temp:
                _conf_value = temp
        
    except Exception as e:
        print(str(e))
    finally:
        return _conf_value

