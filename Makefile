.PHONY: build test all
MAKEFLAGS += --silent

all:
	make lint &&\
		make typecheck &&\
		make format-check &&\
		make test &&\
		make build

NODE_BIN=node_modules/.bin/

## install
install:
	pnpm i --frozen-lockfile

## generate
generate-resume:
	$(NODE_BIN)vite-node script/generate/resume.ts

generate-env:
	$(NODE_BIN)vite-node script/generate/env.ts

generate: generate-env build generate-resume

## dev
next=$(NODE_BIN)next

## env
dev:
	$(NODE_BIN)vite --host

build:
	$(NODE_BIN)vite build

start:
	$(NODE_BIN)vite
