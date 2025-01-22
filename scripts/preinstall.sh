#! /bin/bash

text_color=35 # Purple
background_color=48

expected_node_version="$(cat .nvmrc)"
please_use_correct_node_version="Expected node version is $expected_node_version but you are using $(node -v)"

if [ node -v | grep $expected_node_version ];
	then echo "ok";
	else echo -e "\033[1;${text_color};${background_color}m${please_use_correct_node_version}\033[0m" && exit 1;
fi


# ---- Exit if not using pnpm ------

please_use_pnpm=" ____ ____ ____ _________ ____ ____ ____ ____
||U |||S |||E |||       |||P |||N |||P |||M ||
||__|||__|||__|||_______|||__|||__|||__|||__||
|/__\|/__\|/__\|/_______\|/__\|/__\|/__\|/__\|"

if [[ ! $npm_execpath =~ 'pnpm' ]];
	then echo -e "\033[1;${text_color};${background_color}m${please_use_pnpm}\033[0m" && exit 1;
fi
