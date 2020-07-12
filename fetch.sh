#!/bin/bash

wget -nc --random-wait --mirror -e robots=off --no-cache -k -E --page-requisites --user-agent='User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.94 Safari/537.36' --header='Accept-Language: fr-FR,fr;q=0.8,fr-CA;q=0.6,en-US;q=0.4,en;q=0.2' --header='Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8' http://www.magneticpole.com/

