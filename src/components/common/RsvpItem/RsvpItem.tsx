



interface RsvpDetail {
  title: string;
  description?: string;
  attend: number;
  unattend?: number;
  bride?: boolean
  total?: boolean
}


export default function RsvpItem({ total, title, description, attend, unattend, bride }: RsvpDetail) {

  // const data = {
  //   labels: [
  //     '신부참석',
  //     '신랑참석',
  //     '신부불참',
  //     '신랑불참'
  //   ],
  //   datasets: [{
  //     data: [10, 10, 3, 2],
  //     backgroundColor: [
  //       'rgb(255, 99, 132)',
  //       'rgb(54, 162, 235)',
  //       '#CCCCCC',
  //       '#8b8989'
  //     ],
  //     hoverOffset: 10,
  //   }]
  // }


  return (
    <div className="flex flex-col justify-between text-gray-700 items-center p-3 shadow-md border border-gray-100 rounded-lg bg-white">
      <div className={`flex flex-row w-full  justify-between items-center ${total && 'font-semibold p-3 text-2xl'}`}>
        {title}
        <div className={`flex flex-row  text-xl gap-1 self-start ${bride == undefined ? "text-gray-700" : bride ? "text-red-400" : "text-blue-400"} ${total ? 'text-3xl font-semibold' : 'text-base font-bold'}`}>{attend}
          {unattend && <div className=" text-xs text-gray-600 pt-3 "> {`/ ${unattend}`}</div>}
        </div >
      </div>
      {/* {total &&
        <div className="size-52">
          <Pie data={data} />
        </div>
      } */}
      {description && <div className="text-sm w-full mt-1">{description}</div>}
    </div>
  )
} 