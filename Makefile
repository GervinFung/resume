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
vite=$(NODE_BIN)vite

## env
dev:
	$(vite) --host

build:
	$(vite) build

start:
	$(vite)

compile:
	$(NODE_BIN)tsc -p config/tsconfig/build.json
