from back.engine import *

if __name__ == '__main__':
    eel.init('front')
    launch_preparation()
    eel.start('index.html', mode="chrome", size=(1000, 1000))