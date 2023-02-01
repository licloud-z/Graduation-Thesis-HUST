#!/bin/bash
debugfs /dev/sda5 << EOF
blocks $*
EOF