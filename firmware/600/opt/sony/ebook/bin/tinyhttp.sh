#! /bin/sh

PATH="/usr/local/bin:/usr/bin:/bin:/usr/local/sony/bin:/usr/sbin"
LD_LIBRARY_PATH="/opt/sony/ebook/application:/lib:/usr/lib:/usr/local/sony/lib"
export PATH LD_LIBRARY_PATH

# Call custom script if ebook is not connected to USB
USBCONN=`/bin/cat /proc/usbtg/connect`
if [ "$USBCONN" == 0 ]
then
	/usr/local/sony/bin/mtdmount -t vfat -o utf8 -o shortname=mixed Data /Data

	# Run prsp.sh shell script located on sd card,
	if [ -f /Data/database/system/PRSPlus/prsp.sh ]
	then
		. /Data/database/system/PRSPlus/prsp.sh
	fi
	/bin/umount /Data
fi

#start kbook application
/opt/sony/ebook/application/tinyhttp
if [ $? == 0 ]; then
	/bin/sync
	/usr/local/sony/bin/ioctl /dev/ebklog 0x01 0x01 # log write
	if [ -r /tmp/exitcode ]; then
		CODE=`/bin/cat /tmp/exitcode`
		/bin/rm /tmp/exitcode
#		/bin/echo $CODE
		if [ $CODE == 3 ]; then
			NUM=`grep \"Data\" /proc/mtd | awk -F: '{print $1}' | awk -Fd '{print$2}'`
			/usr/local/sony/bin/mkdosfs /dev/mtdblock$NUM
			/bin/grep \"Data\" /etc/mtab > /dev/null
			if [ $? == 0 ]; then
#				/bin/echo reboot
				/sbin/reboot
			else
#				/bin/echo restart application		
				exec /opt/sony/ebook/bin/tinyhttp.sh
			fi
# E_BOOK add for Oslo SD/MS formating
		elif [ $CODE == 4 ] ; then
			/usr/local/sony/bin/sd_fmt /dev/sdmscard/sdmsctl0 > /dev/null
			if [ $? == 0 ]; then
#				/bin/echo restart application		
# E_BOOK 2009/04/14 
				sleep 2;
				exec /opt/sony/ebook/bin/tinyhttp.sh
			else
#				/bin/echo reboot
				/sbin/reboot
			fi
		elif [ $CODE == 5 ] ; then
			/usr/local/sony/bin/sd_fmt /dev/sdmscard/sdmsctl2 > /dev/null
			if [ $? == 0 ]; then
#				/bin/echo restart application		
# E_BOOK 2009/04/14 
				sleep 2;
				exec /opt/sony/ebook/bin/tinyhttp.sh
			else
#				/bin/echo reboot
				/sbin/reboot
			fi
		fi
	fi
#	/bin/echo poweroff
	/sbin/poweroff
else
	/bin/sync
        /usr/local/sony/bin/ioctl /dev/ebklog 0x01 0x01 # log write
#	/bin/echo reboot
	/sbin/reboot
fi
