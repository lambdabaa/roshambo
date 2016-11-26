JS = $(shell find src -name "*.js")
BUILD = $(patsubst src/%.js, build/%.js, $(JS))
STYLE = $(shell find style -name "*.css")

.PHONY: all
all: bundle.js bundle.css

.PHONY: clean
clean:
	rm -rf build bundle.js bundle.css

bundle.js: $(BUILD)
	./node_modules/.bin/browserify build/main.js -o $@

bundle.css: $(STYLE)
	cat $^ > $@

build/%.js: src/%.js
	@mkdir -p "$(@D)"
	./node_modules/.bin/babel $^ -o $@
