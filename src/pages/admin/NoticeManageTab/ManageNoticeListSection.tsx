import Button from '@components/Button';
import RoundedButton from '@components/RoundedButton';
import Table from '@components/Table';
import { useQuery } from '@tanstack/react-query';
import { getNotices } from 'apis/notices';
import { NoticeResponseDto } from 'types/DTO/notices/NoticeResponseDto';

const ManageNoticeListSection = () => {
  const { data: notices, isError } = useQuery({
    queryKey: ['notices'],
    queryFn: getNotices,
  });

  return (
    <>
      <section className="flex min-w-[350px] flex-col gap-8">
        <h3 className="text-2xl font-bold">공지사항 목록</h3>
        {isError && <p className="text-mainRed">공지사항을 불러오는 중 오류가 발생했습니다.</p>}
        <Table<NoticeResponseDto>
          columns={[
            {
              label: '편집일시',
              width: '20%',
              key: 'updatedAt',
              render: (row) => row.updatedAt.replace('T', ' ').slice(0, 16),
            },
            { label: '제목', width: '50%', key: 'title' },
          ]}
          rows={notices ?? []}
          actions={(row) => (
            <>
              <Button className="bg-mainRed h-[35px] w-full min-w-[70px]" onClick={() => {}}>
                삭제하기
              </Button>
              <Button className="bg-mainGreen h-[35px] w-full min-w-[70px]" onClick={() => {}}>
                수정하기
              </Button>
            </>
          )}
        />
        <button type="submit" className="bg-mainBlue mx-auto w-fit rounded-lg px-6 py-3 text-lg text-white">
          공지사항 추가하기
        </button>
      </section>
    </>
  );
};

export default ManageNoticeListSection;
