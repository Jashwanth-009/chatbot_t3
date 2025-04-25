import os
import configparser
import logging

# Get the absolute path of the current script's directory
project_root = os.path.dirname(os.path.abspath(__file__))

# Construct paths relative to the script's location
pdf_dir = os.path.join(project_root, 'pdfs')  # Assuming you have a 'pdfs' directory in your project
logs_dir = os.path.join(project_root, 'logs')

# Ensure the logs directory exists
os.makedirs(logs_dir, exist_ok=True)

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    filemode='w',
    filename=os.path.join(logs_dir, 'config.log'),
    encoding="utf-8",
    format='%(asctime)s - %(levelname)s - %(message)s'
)

logging.info("logging successful")

# Create config
config = configparser.ConfigParser()

config.add_section('path')
config.set('path', 'pdf_dir', pdf_dir)

# Write config to a relative path
configfile_path = os.path.join(logs_dir, 'configfile.properties')
with open(configfile_path, 'w') as configfile:
    config.write(configfile)

logging.info("config successful")
