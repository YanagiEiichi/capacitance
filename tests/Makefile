jsfiles = $(shell find * -name '*.js')

.PHONY: $(jsfiles)

test: $(jsfiles)

$(jsfiles):
	@echo '[1mTest[0m $@ ... \c'; \
	if node $@; then \
	  echo '[32mOK[0m'; \
	else \
	  echo '[31mError[0m'; \
	fi
